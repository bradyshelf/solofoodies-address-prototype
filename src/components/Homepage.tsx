
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ProfileSidebar from './ProfileSidebar';

const Homepage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/30 rounded-full blur-xl animate-pulse" style={{
          animationDelay: '1s'
        }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl mb-4">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Solo Foodies</h1>
          <p className="text-gray-600">Restaurant Profile Management</p>
        </div>

        {/* Profile Access Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Restaurant Profile
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button className="w-full bg-red-500 hover:bg-red-600 h-12">
                  Access Profile Settings
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80">
                <ProfileSidebar onClose={() => setIsSidebarOpen(false)} />
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>Restaurant Profile Management System</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
