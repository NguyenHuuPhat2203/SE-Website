import { Trophy, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import type { Language } from '../../App';
import { useState } from 'react';


const mockContests = [
  { id: 1, title: 'Algorithm Challenge 2025', type: 'academic', description: 'Competitive programming contest', period: 'Nov 25 - Dec 25', status: 'open', participants: 45 },
  { id: 2, title: 'Hackathon: Smart City Solutions', type: 'non-academic', description: 'Build innovative solutions for smart cities', period: 'Jan 10 - Jan 15', status: 'closed', participants: 32 },
  { id: 3, title: 'Data Science Competition', type: 'academic', description: 'Machine learning and data analysis', period: 'Nov 30 - Dec 25', status: 'open', participants: 67 }
];

interface ContestsScreenProps {
  language: Language;
  onNavigate?: (screen: string, contestId?: number) => void;
}

export function ContestsScreen({ language, onNavigate }: ContestsScreenProps) {
  const t = {
    title: language === 'en' ? 'Community & Contests' : 'Cộng đồng & Cuộc thi',
    qa: language === 'en' ? 'Q&A' : 'Hỏi đáp',
    contests: language === 'en' ? 'Contests' : 'Cuộc thi',
    academic: language === 'en' ? 'Academic Contests' : 'Cuộc thi học thuật',
    nonAcademic: language === 'en' ? 'Non-academic Contests' : 'Cuộc thi phi học thuật',
    open: language === 'en' ? 'Open' : 'Đang mở',
    closed: language === 'en' ? 'Closed' : 'Đã đóng',
    register: language === 'en' ? 'Register' : 'Đăng ký',
    registered: language === 'en' ? 'Registered' : 'Đã đăng ký',
    viewDetails: language === 'en' ? 'View details' : 'Xem chi tiết',
    participants: language === 'en' ? 'participants' : 'người tham gia'
  };

  const [registered, setRegistered] = useState<number[]>([]);

  const toggleRegister = (id: number) => {
    setRegistered(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-900">{t.title}</h1>
      </div>

      <Tabs defaultValue="contests">
        <TabsList>
          {/* <TabsTrigger value="qa">{t.qa}</TabsTrigger> */}
          <TabsTrigger value="contests">{t.contests}</TabsTrigger>
        </TabsList>

        <TabsContent value="contests" className="space-y-6 mt-6">
          <div>
            <h2 className="text-gray-900 mb-4">{t.academic}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockContests.filter(c => c.type === 'academic').map((contest) => (
                <Card key={contest.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Trophy className="h-8 w-8 text-yellow-600" />
                      <Badge variant={contest.status === 'open' ? 'default' : 'secondary'}>
                        {contest.status === 'open' ? t.open : t.closed}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{contest.title}</CardTitle>
                    <CardDescription>{contest.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{contest.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{contest.participants} {t.participants}</span>
                    </div>
                    <div className="flex gap-2">
                      {/* <Button className="flex-1" disabled={contest.status === 'closed'}>
                        {t.register}
                      </Button> */}
                      <Button
                        className={`flex-1 ${
                          registered.includes(contest.id)
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : ''
                        }`}
                        disabled={contest.status === 'closed' || registered.includes(contest.id)}
                        onClick={() => toggleRegister(contest.id)}
                      >
                      {registered.includes(contest.id) ? t.registered : t.register}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate('contest-detail', contest.id);
                          }
                        }}
                      >
                        {t.viewDetails}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-gray-900 mb-4">{t.nonAcademic}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockContests.filter(c => c.type === 'non-academic').map((contest) => (
                <Card key={contest.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Trophy className="h-8 w-8 text-blue-600" />
                      <Badge variant={contest.status === 'open' ? 'default' : 'secondary'}>
                        {contest.status === 'open' ? t.open : t.closed}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{contest.title}</CardTitle>
                    <CardDescription>{contest.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{contest.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{contest.participants} {t.participants}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" disabled={contest.status === 'closed'}>
                        {t.register}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate('contest-detail', contest.id);
                          }
                        }}
                      >
                        {t.viewDetails}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* <TabsContent value="qa">
          <div className="text-center py-12 text-gray-500">
            Q&A content (see Q&A screen)
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
