import { ChevronRight, ChevronLeft, Globe, Database, Cpu, Users, Trophy, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import type { Language } from '../../App';

interface StudentHomeProps {
  onNavigate: (screen: string, sessionId?: number) => void;
  language: Language;
  user: {
    name: string;
    faculty?: string;
  };
}

export function StudentHome({ onNavigate, language, user }: StudentHomeProps) {
  const t = {
    dashboard: language === 'en' ? 'Student Dashboard' : 'Bảng điều khiển Sinh viên',
    hotContest: language === 'en' ? 'HOT CONTEST' : 'CUỘC THI HOT',
    talentsTitle: "HCMUT's Got Talents",
    joinNow: language === 'en' ? 'Join now' : 'Tham gia ngay',
    ongoingSessions: language === 'en' ? 'Ongoing consultation sessions' : 'Các buổi tư vấn đang diễn ra',
    personalInfo: language === 'en' ? 'Personal Information' : 'Thông tin cá nhân',
    student: language === 'en' ? 'Student' : 'Sinh viên',
    activityTime: language === 'en' ? 'Activity time (h)' : 'Thời gian hoạt động (h)',
    ongoingContests: language === 'en' ? 'Ongoing contests' : 'Cuộc thi đang diễn ra',
    join: language === 'en' ? 'Join' : 'Tham gia',
    registering: language === 'en' ? 'registering' : 'người đăng ký',
    professor: language === 'en' ? 'Professor' : 'Giảng viên',
  };



  const consultations = [
    {
      id: 1,
      title: language === 'en' ? 'Binary Trees' : 'Cây nhị phân',
      category: 'DSA',
      categoryColor: 'pink',
      instructor: language === 'en' ? 'Le Thanh Sach' : 'Le Thanh Sach',
      image: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwYWxnb3JpdGhtJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzYzNzE3NzI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: language === 'en' ? 'Algorithm Analysis' : 'Phân tích giải thuật',
      category: 'DSA',
      categoryColor: 'pink',
      instructor: language === 'en' ? 'Tran Ngoc Bao Duy' : 'Tran Ngoc Bao Duy',
      image: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb2RpbmclMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NjM3MTc3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: language === 'en' ? 'Dynamic Programming' : 'Quy hoạnh động',
      category: 'DSA',
      categoryColor: 'pink',
      instructor: language === 'en' ? 'Tran Tuan Anh' : 'Tran Tuan Anh',
      image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBzY3JlZW58ZW58MXx8fHwxNzYzNzA2OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const contests = [
    {
      id: 1,
      title: 'Algorithm Challenge 2025',
      participants: language === 'en' ? '45 people registering' : '45 người đăng ký',
    },
    {
      id: 2,
      title: 'Data Science Competition',
      participants: language === 'en' ? '67 people registering' : '67 người đăng ký',
    },
    // {
    //   id: 3,
    //   title: 'Hackathon 2025',
    //   participants: language === 'en' ? '45 people registering' : '45 người đăng ký',
    // },
  ];

  const activityDates = ['1-10 Nov', '11-20 Nov', '20-30 Nov'];

  return (
    <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Banner */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          <div className="p-8 relative z-10">
            <p className="text-sm mb-2 opacity-90">{t.hotContest}</p>
            <h2 className="text-3xl mb-4">{t.talentsTitle}</h2>
            <Button 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              onClick={() => onNavigate('contests')}
            >
              {t.joinNow} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>



        {/* Ongoing Sessions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl">{t.ongoingSessions}</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 hover:text-white">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {consultations.map((session) => (
              <Card 
                key={session.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onNavigate('consultation-session-detail', session.id)}
              >
                <div className="aspect-video overflow-hidden bg-gray-900">
                  <img 
                    src={session.image} 
                    alt={session.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="p-4">
                  <Badge 
                    variant="outline" 
                    className={`mb-2 ${
                      session.categoryColor === 'blue' ? 'border-blue-300 bg-blue-50 text-blue-700' :
                      session.categoryColor === 'pink' ? 'border-pink-300 bg-pink-50 text-pink-700' :
                      'border-green-300 bg-green-50 text-green-700'
                    }`}
                  >
                    {session.categoryColor === 'blue' && <Globe className="h-3 w-3 mr-1" />}
                    {session.categoryColor === 'pink' && <Database className="h-3 w-3 mr-1" />}
                    {session.categoryColor === 'green' && <Cpu className="h-3 w-3 mr-1" />}
                    {session.category}
                  </Badge>
                  <h4 className="mb-3 line-clamp-2">{session.title}</h4>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {session.instructor.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{session.instructor}</p>
                      <p className="text-xs text-gray-500">{t.professor}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        {/* Personal Info Card */}
        <Card className="p-6">
          <h3 className="mb-4">{t.personalInfo}</h3>
          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-3">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#f3f4f6"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#7c3aed"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56 * 0.32} ${2 * Math.PI * 56}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-indigo-400 text-white text-2xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                32%
              </div>
            </div>
            <p className="text-center mb-1">{user.name}</p>
            <p className="text-sm text-gray-500">{t.student}</p>
          </div>
        </Card>

        {/* Ongoing Contests */}
        <Card className="p-6">
          <h3 className="mb-4">{t.ongoingContests}</h3>
          <div className="space-y-3">
            {contests.map((contest) => (
              <div 
                key={contest.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onNavigate('contests')}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      <Trophy className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{contest.title}</p>
                    <p className="text-xs text-gray-500">{contest.participants}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('contests');
                  }}
                >
                  {t.join}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}