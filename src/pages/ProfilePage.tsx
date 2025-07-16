
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Edit, Plus, MapPin, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RestaurantProfile {
  id?: string;
  restaurant_name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  website_url: string;
  cuisine_type: string;
}

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  contact_person: string;
  country: string;
}

// Location data for cascading dropdowns
const countryData = {
  'España': {
    'Madrid': ['Madrid', 'Alcalá de Henares', 'Leganés', 'Fuenlabrada', 'Alcorcón'],
    'Barcelona': ['Barcelona', 'Hospitalet de Llobregat', 'Badalona', 'Terrassa', 'Sabadell'],
    'Valencia': ['Valencia', 'Alicante', 'Elche', 'Castellón de la Plana', 'Torrent'],
    'Andalucía': ['Sevilla', 'Málaga', 'Córdoba', 'Granada', 'Jerez de la Frontera'],
    'Galicia': ['A Coruña', 'Vigo', 'Ourense', 'Lugo', 'Santiago de Compostela']
  }
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<RestaurantProfile>({
    restaurant_name: 'Lisa Burger',
    description: 'Delicious burgers and amazing atmosphere in the heart of Madrid',
    address: 'Calle Mesón de Paredes 5',
    city: 'Madrid',
    state: 'Madrid',
    zip_code: '28012',
    phone: '+34 912 345 678',
    website_url: 'https://lisaburger.es',
    cuisine_type: 'Burger Restaurant'
  });
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Malasaña',
      address: 'Calle Mesón de Paredes 5',
      city: 'Madrid',
      state: 'Madrid',
      zip_code: '28012',
      phone: '+34 912 345 678',
      contact_person: 'María García',
      country: 'España'
    }
  ]);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocation, setNewLocation] = useState<Omit<Location, 'id'>>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    contact_person: '',
    country: ''
  });

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Profile saved successfully"
    });
    setIsEditing(false);
  };

  const handleAddLocation = () => {
    const location: Location = {
      id: Math.random().toString(36).substr(2, 9),
      ...newLocation
    };
    setLocations([...locations, location]);
    setNewLocation({
      name: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      phone: '',
      contact_person: '',
      country: ''
    });
    setShowAddLocation(false);
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">EDITAR PERFIL</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Image Section */}
        <div className="bg-card rounded-lg p-4 space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <img
                src="/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png"
                alt="Restaurant"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Nombre</Label>
                {isEditing ? (
                  <Input
                    value={profile.restaurant_name}
                    onChange={(e) => setProfile({...profile, restaurant_name: e.target.value})}
                    placeholder="Nombre del restaurante"
                    className="h-9"
                  />
                ) : (
                  <p className="font-medium text-sm">{profile.restaurant_name}</p>
                )}
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">Nombre de usuario</Label>
                <p className="text-muted-foreground text-sm">@{profile.restaurant_name?.toLowerCase().replace(/\s+/g, '')}</p>
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Biografía</Label>
            {isEditing ? (
              <Textarea
                value={profile.description}
                onChange={(e) => setProfile({...profile, description: e.target.value})}
                placeholder="Describe tu restaurante..."
                rows={2}
                className="resize-none text-sm"
              />
            ) : (
              <p className="text-sm">{profile.description}</p>
            )}
          </div>
          
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Teléfono</Label>
            {isEditing ? (
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                placeholder="Número de teléfono"
                className="h-9 text-sm"
              />
            ) : (
              <p className="text-sm">{profile.phone}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label className="text-xs text-muted-foreground">Ocultar perfil</Label>
            <Switch />
          </div>
        </div>

        {/* Locations Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Mis ubicaciones</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddLocation(true)}
              className="text-primary"
            >
              + Añadir
            </Button>
          </div>

          {showAddLocation && (
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-medium text-primary">Nueva ubicación</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Ubicación *</Label>
                  <Input
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                    placeholder="Ej. Malasaña"
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Calle *</Label>
                  <Input
                    value={newLocation.address}
                    onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                    placeholder="Ej. Calle Mayor, 15"
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">País *</Label>
                  <Select
                    value={newLocation.country}
                    onValueChange={(value) => setNewLocation({
                      ...newLocation,
                      country: value,
                      state: '',
                      city: ''
                    })}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Ej. España" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(countryData).map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Ciudad *</Label>
                    <Select
                      value={newLocation.city}
                      onValueChange={(value) => setNewLocation({
                        ...newLocation,
                        city: value
                      })}
                      disabled={!newLocation.state}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Ej. Madrid" />
                      </SelectTrigger>
                      <SelectContent>
                        {newLocation.country && newLocation.state && 
                          countryData[newLocation.country as keyof typeof countryData]?.[newLocation.state]?.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Provincia *</Label>
                    <Select
                      value={newLocation.state}
                      onValueChange={(value) => setNewLocation({
                        ...newLocation,
                        state: value,
                        city: ''
                      })}
                      disabled={!newLocation.country}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Ej. Salamanca" />
                      </SelectTrigger>
                      <SelectContent>
                        {newLocation.country && countryData[newLocation.country as keyof typeof countryData] && 
                          Object.keys(countryData[newLocation.country as keyof typeof countryData]).map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Persona de contacto *</Label>
                  <Input
                    value={newLocation.contact_person}
                    onChange={(e) => setNewLocation({...newLocation, contact_person: e.target.value})}
                    placeholder="Ej. María García"
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Teléfono *</Label>
                  <Input
                    value={newLocation.phone}
                    onChange={(e) => setNewLocation({...newLocation, phone: e.target.value})}
                    placeholder="Ej. 912345678"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button onClick={handleAddLocation} className="flex-1 h-9 text-sm">
                    Guardar ubicación
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddLocation(false)}
                    className="flex-1 h-9 text-sm"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {locations.map((location) => (
            <div key={location.id} className="border rounded-lg p-4 bg-card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h3 className="font-medium text-sm">{location.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{location.address}</p>
                  <p className="text-xs text-muted-foreground mb-2">{location.city}, {location.state}</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">PERSONA DE CONTACTO</span>
                      <span>{location.contact_person}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">TELÉFONO</span>
                      <span>{location.phone}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteLocation(location.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Business Info */}
        <div className="space-y-4">
          <h2 className="font-medium text-primary">Datos de facturación</h2>
          <div className="bg-card rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Razón social</Label>
              <p className="text-sm font-medium">LISA BURGER SL</p>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">CIF</Label>
              <p className="text-sm">B72613250</p>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Dirección</Label>
              <p className="text-sm">Calle Mesón de Paredes 5</p>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Ciudad</Label>
              <p className="text-sm">Madrid</p>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Est./Provincia</Label>
              <p className="text-sm">Madrid</p>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Código postal</Label>
              <p className="text-sm">28012</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 max-w-lg mx-auto">
            <div className="flex space-x-3">
              <Button onClick={handleSave} className="flex-1 h-10">
                Guardar
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex-1 h-10"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Bottom spacing for fixed button */}
        {isEditing && <div className="h-20" />}
      </div>
    </div>
  );
};

export default ProfilePage;
