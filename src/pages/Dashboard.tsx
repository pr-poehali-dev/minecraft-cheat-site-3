import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  uid: number;
  username: string;
  onLogout: () => void;
}

interface UserProfile {
  uid: number;
  username: string;
  created_at: string;
  last_login: string;
  downloads_count: number;
  favorite_version: string | null;
}

interface Version {
  version: string;
  releaseDate: string;
  description: string;
  downloadUrl: string | null;
  features: string[];
  isLatest: boolean;
}

interface NewsItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  versionTag: string | null;
}

const Dashboard = ({ uid, username, onLogout }: DashboardProps) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [versions, setVersions] = useState<Version[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
    fetchVersions();
    fetchNews();
  }, [uid]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `https://functions.poehali.dev/c29ec537-0750-4a0d-9028-770ade78e8dd?uid=${uid}`
      );
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchVersions = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/dc788e22-6161-437e-a2f5-d00af3ff5308');
      const data = await response.json();
      if (response.ok) {
        setVersions(data);
      }
    } catch (error) {
      console.error('Error fetching versions:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/a6e3a05b-6f92-4531-a398-c8e367ee5e57');
      const data = await response.json();
      if (response.ok) {
        setNews(data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleDownload = (version: string) => {
    toast({
      title: 'Скачивание началось',
      description: `Версия ${version} скоро будет загружена`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

      <div className="relative z-10">
        <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name="Sword" className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Minecraft Cheat
                </h1>
                <p className="text-xs text-muted-foreground">Добро пожаловать, {username}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} size="sm">
              <Icon name="LogOut" className="w-4 h-4 mr-2" />
              Выход
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="profile">
                <Icon name="User" className="w-4 h-4 mr-2" />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="news">
                <Icon name="Newspaper" className="w-4 h-4 mr-2" />
                Новости
              </TabsTrigger>
              <TabsTrigger value="downloads">
                <Icon name="Download" className="w-4 h-4 mr-2" />
                Скачать
              </TabsTrigger>
              <TabsTrigger value="community">
                <Icon name="Users" className="w-4 h-4 mr-2" />
                Сообщество
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="UserCircle" className="w-5 h-5 text-primary" />
                    Личный кабинет
                  </CardTitle>
                  <CardDescription>Информация о вашем аккаунте</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">UID</p>
                          <p className="text-2xl font-bold text-primary">#{profile.uid}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Пользователь</p>
                          <p className="text-2xl font-bold">{profile.username}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Зарегистрирован</p>
                          <p className="font-medium">
                            {new Date(profile.created_at).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Последний вход</p>
                          <p className="font-medium">
                            {profile.last_login
                              ? new Date(profile.last_login).toLocaleDateString('ru-RU')
                              : 'Никогда'}
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Скачиваний</p>
                        <p className="text-xl font-bold">{profile.downloads_count}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="space-y-4">
              {news.map((item) => (
                <Card key={item.id} className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {item.title}
                          {item.versionTag && (
                            <Badge variant="outline" className="border-primary text-primary">
                              v{item.versionTag}
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          {new Date(item.createdAt).toLocaleDateString('ru-RU')} • {item.author}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="downloads" className="space-y-4">
              {versions.map((version) => (
                <Card key={version.version} className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Версия {version.version}
                          {version.isLatest && (
                            <Badge className="bg-primary text-primary-foreground">Последняя</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          Релиз: {new Date(version.releaseDate).toLocaleDateString('ru-RU')}
                        </CardDescription>
                      </div>
                      <Button onClick={() => handleDownload(version.version)}>
                        <Icon name="Download" className="w-4 h-4 mr-2" />
                        Скачать
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{version.description}</p>
                    <div>
                      <p className="text-sm font-medium mb-2">Функции:</p>
                      <ul className="grid grid-cols-2 gap-2">
                        {version.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <Icon name="Check" className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="community" className="space-y-4">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageCircle" className="w-5 h-5 text-primary" />
                    Telegram сообщество
                  </CardTitle>
                  <CardDescription>
                    Присоединяйтесь к нашему сообществу для обсуждений и поддержки
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name="Send" className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Официальный Telegram канал</p>
                      <p className="text-sm text-muted-foreground">
                        Новости, обновления и поддержка
                      </p>
                    </div>
                    <Button variant="outline">
                      Подписаться
                    </Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Преимущества участия:</p>
                    <ul className="space-y-2">
                      {[
                        'Ранний доступ к новым версиям',
                        'Прямая поддержка от разработчиков',
                        'Обсуждение функций и багов',
                        'Эксклюзивные конфигурации',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Star" className="w-4 h-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
