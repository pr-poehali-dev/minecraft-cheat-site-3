import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface User {
  username: string;
  uid: number;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    
    // Симуляция логина с генерацией UID
    const uid = Math.floor(Math.random() * 10000) + 1;
    setCurrentUser({ username, uid });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0606] via-[#0f0a0a] to-[#1a0f0f] p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-crimson-900/20 via-transparent to-transparent"></div>
        
        <Card className="w-full max-w-md gradient-border crimson-glow relative z-10 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center crimson-glow">
                <Icon name="Sword" size={32} className="text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl glow-text">MINECRAFT CHEAT</CardTitle>
            <CardDescription className="text-muted-foreground">
              {loginMode === 'login' ? 'Войдите в систему' : 'Создайте аккаунт'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={loginMode} onValueChange={(v) => setLoginMode(v as 'login' | 'register')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Логин</label>
                    <Input 
                      name="username"
                      placeholder="Введите логин" 
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Пароль</label>
                    <Input 
                      name="password"
                      type="password" 
                      placeholder="Введите пароль" 
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    Войти
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Логин</label>
                    <Input 
                      name="username"
                      placeholder="Придумайте логин" 
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Пароль</label>
                    <Input 
                      name="password"
                      type="password" 
                      placeholder="Придумайте пароль" 
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Повторите пароль</label>
                    <Input 
                      type="password" 
                      placeholder="Повторите пароль" 
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    Зарегистрироваться
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0606] via-[#0f0a0a] to-[#1a0f0f]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-crimson-900/10 via-transparent to-transparent"></div>
      
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-card/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center crimson-glow">
              <Icon name="Sword" size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold glow-text">MC CHEAT</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-primary border-primary">
              UID: {currentUser?.uid}
            </Badge>
            <span className="text-sm text-muted-foreground">{currentUser?.username}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="LogOut" size={18} />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="profile">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="downloads">
              <Icon name="Download" size={16} className="mr-2" />
              Скачать
            </TabsTrigger>
            <TabsTrigger value="news">
              <Icon name="Newspaper" size={16} className="mr-2" />
              Новости
            </TabsTrigger>
            <TabsTrigger value="community">
              <Icon name="Users" size={16} className="mr-2" />
              Сообщество
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="gradient-border crimson-glow bg-card/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl glow-text">Личный кабинет</CardTitle>
                <CardDescription>Информация о вашем аккаунте</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-background/50 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Уникальный ID</div>
                    <div className="text-3xl font-bold text-primary glow-text">#{currentUser?.uid}</div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Логин</div>
                    <div className="text-2xl font-semibold">{currentUser?.username}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Статистика</h3>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="p-3 bg-background/30 rounded-lg border border-border">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Icon name="Calendar" size={14} />
                        Дата регистрации
                      </div>
                      <div className="font-medium">15.01.2025</div>
                    </div>
                    <div className="p-3 bg-background/30 rounded-lg border border-border">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Icon name="Download" size={14} />
                        Скачиваний
                      </div>
                      <div className="font-medium">3</div>
                    </div>
                    <div className="p-3 bg-background/30 rounded-lg border border-border">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Icon name="Activity" size={14} />
                        Активность
                      </div>
                      <div className="font-medium">Высокая</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-lg font-semibold mb-3">Настройки</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Key" size={16} className="mr-2" />
                      Сменить пароль
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Bell" size={16} className="mr-2" />
                      Уведомления
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="gradient-border crimson-glow bg-card/95 backdrop-blur hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">Версия 2.0</CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">LATEST</Badge>
                  </div>
                  <CardDescription>Самая новая и функциональная версия</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={14} className="text-green-400" />
                      <span>Все функции разблокированы</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={14} className="text-green-400" />
                      <span>Обновлённый интерфейс</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={14} className="text-green-400" />
                      <span>Максимальная производительность</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать v2.0
                  </Button>
                </CardContent>
              </Card>

              <Card className="gradient-border bg-card/95 backdrop-blur hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">Версия 1.3</CardTitle>
                    <Badge variant="outline" className="border-primary text-primary">STABLE</Badge>
                  </div>
                  <CardDescription>Стабильная версия с хорошим функционалом</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={14} className="text-primary" />
                      <span>Основные функции</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={14} className="text-primary" />
                      <span>Проверенная стабильность</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={14} className="text-primary" />
                      <span>Регулярные обновления</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать v1.3
                  </Button>
                </CardContent>
              </Card>

              <Card className="gradient-border bg-card/95 backdrop-blur opacity-75 hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">Версия 1.2.2</CardTitle>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">OLD</Badge>
                  </div>
                  <CardDescription>Старая версия, не рекомендуется</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="X" size={14} />
                      <span>Ограниченный функционал</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="X" size={14} />
                      <span>Устаревший интерфейс</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="AlertTriangle" size={14} />
                      <span>Больше не поддерживается</span>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full text-muted-foreground">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать v1.2.2
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <Card className="gradient-border crimson-glow bg-card/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl glow-text">Последние новости</CardTitle>
                <CardDescription>Обновления и изменения в проекте</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Релиз версии 2.0! 🎉</h3>
                      <Badge>02.02.2026</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Мы рады представить самую масштабную версию нашего чита! Полностью переработанный интерфейс, новые функции и максимальная производительность.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <Icon name="Sparkles" size={14} />
                      <span>Основное обновление</span>
                    </div>
                  </div>

                  <div className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Обновление v1.3.5</h3>
                      <Badge variant="outline">25.01.2026</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Исправлены критические баги, улучшена стабильность работы. Рекомендуем всем пользователям v1.3 обновиться.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Bug" size={14} />
                      <span>Исправление ошибок</span>
                    </div>
                  </div>

                  <div className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Changelog v2.0</h3>
                      <Badge variant="outline">02.02.2026</Badge>
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="Plus" size={14} className="mt-0.5 text-green-400" />
                        <span>Добавлен режим "Ghost Mode" для невидимости</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Plus" size={14} className="mt-0.5 text-green-400" />
                        <span>Улучшена система автоматического фарма ресурсов</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Wrench" size={14} className="mt-0.5 text-blue-400" />
                        <span>Переработан UI/UX интерфейса</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Zap" size={14} className="mt-0.5 text-yellow-400" />
                        <span>Оптимизация производительности на 40%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card className="gradient-border crimson-glow bg-card/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl glow-text">Наше сообщество</CardTitle>
                <CardDescription>Присоединяйтесь к нашему Telegram-каналу</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center text-center space-y-4 py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0088cc] to-[#229ED9] rounded-2xl flex items-center justify-center crimson-glow">
                    <Icon name="Send" size={40} className="text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Telegram канал</h3>
                    <p className="text-muted-foreground max-w-md">
                      Новости, обновления, поддержка и общение с другими пользователями
                    </p>
                  </div>
                  <Button size="lg" className="bg-gradient-to-r from-[#0088cc] to-[#229ED9] hover:opacity-90">
                    <Icon name="Send" size={18} className="mr-2" />
                    Присоединиться к Telegram
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3 pt-6 border-t border-border">
                  <div className="text-center p-4">
                    <div className="text-3xl font-bold text-primary glow-text mb-1">1,234</div>
                    <div className="text-sm text-muted-foreground">Участников</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-3xl font-bold text-primary glow-text mb-1">500+</div>
                    <div className="text-sm text-muted-foreground">Активных пользователей</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-3xl font-bold text-primary glow-text mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">Поддержка</div>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  <h3 className="font-semibold text-lg">Что вы получите:</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-start gap-3 p-3 bg-background/30 rounded-lg">
                      <Icon name="Bell" size={20} className="text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Мгновенные уведомления</div>
                        <div className="text-xs text-muted-foreground">О новых версиях и обновлениях</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-background/30 rounded-lg">
                      <Icon name="MessageCircle" size={20} className="text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Прямая поддержка</div>
                        <div className="text-xs text-muted-foreground">Ответы на вопросы от разработчиков</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-background/30 rounded-lg">
                      <Icon name="Gift" size={20} className="text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Эксклюзивный контент</div>
                        <div className="text-xs text-muted-foreground">Ранний доступ к новым функциям</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-background/30 rounded-lg">
                      <Icon name="Users" size={20} className="text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Активное сообщество</div>
                        <div className="text-xs text-muted-foreground">Общение с другими игроками</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
