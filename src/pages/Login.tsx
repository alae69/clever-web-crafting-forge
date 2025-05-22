
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { t, language } = useLanguageStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(username, password)) {
      toast.success(t('loginSuccessful'));
      navigate("/admin");
    } else {
      toast.error(t('invalidCredentials'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              <span className="text-morocco-terracotta">Najih</span>
              <span className="text-morocco-navy">Kids</span>
              <span className="block text-base text-gray-600 mt-1">{t('adminPanel')}</span>
            </CardTitle>
            <CardDescription className="text-center">
              {t('loginCredentialsPrompt')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t('username')}</Label>
                <Input 
                  id="username"
                  placeholder={t('enterUsername')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder={t('enterPassword')} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                {t('login')}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-center w-full text-gray-600">
              {t('protectedAreaWarning')}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
