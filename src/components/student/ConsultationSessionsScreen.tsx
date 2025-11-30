import React, { useState, useMemo } from 'react';
import { Calendar, Plus, Search, Star, Users, Clock, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { toast } from 'sonner';
import type { Language } from '../../App';

interface ConsultationSessionsScreenProps {
  language: Language;
  onNavigate?: (screen: string, sessionId?: number) => void;
}

export function ConsultationSessionsScreen({ language, onNavigate }: ConsultationSessionsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedSessions, setJoinedSessions] = useState<number[]>([]);

  const t = {
    title: language === 'en' ? 'Consultation Sessions' : 'Các buổi tư vấn',
    description: language === 'en' ? 'Join consultation sessions with tutors' : 'Tham gia các buổi tư vấn với cố vấn',
    mySessions: language === 'en' ? 'My sessions' : 'Buổi tư vấn của tôi',
    upcoming: language === 'en' ? 'Upcoming' : 'Sắp diễn ra',
    ongoing: language === 'en' ? 'Ongoing' : 'Đang diễn ra',
    search: language === 'en' ? 'Search sessions...' : 'Tìm kiếm buổi tư vấn...',
    participants: language === 'en' ? 'participants' : 'người tham gia',
    join: language === 'en' ? 'Join' : 'Tham gia',
    open: language === 'en' ? 'Open' : 'Mở',
    registered: language === 'en' ? 'Registered' : 'Đã đăng ký',
    tutor: language === 'en' ? 'Tutor' : 'Cố vấn',
    live: language === 'en' ? 'LIVE' : 'ĐANG PHÁT',
    joined: language === 'en' ? 'Joined' : 'Đã tham gia',
  };

  const [mySessions, setMySessions] = useState([
    {
      id: 1,
      title: language === 'en' ? 'Assembly programming guide' : 'Hướng dẫn lập trình Assembly',
      subject: 'Computer Architecture',
      tutor: language === 'en' ? 'Le Thanh Van' : 'Le Thanh Van',
      date: language === 'en' ? 'Tomorrow, 3:00 PM' : 'Ngày mai, 3:00 CH',
      participants: 12,
      maxParticipants: 20,
      status: 'upcoming',
      description: 'Learn the fundamentals of assembly programming',
    },
    {
      id: 2,
      title: language === 'en' ? 'Sorting algorithms' : 'Các thuật toán sắp xếp',
      subject: 'DSA',
      tutor: language === 'en' ? 'Le Thanh Sach' : 'Le Thanh Sach',
      date: language === 'en' ? 'Now' : 'Hiện tại',
      participants: 18,
      maxParticipants: 25,
      status: 'ongoing',
      description: 'Deep dive into sorting algorithms and their complexities',
    },
  ]);

  const [upcomingSessions, setUpcomingSessions] = useState([
    {
      id: 3,
      title: language === 'en' ? 'How to build a semantic checker' : 'Cách xây dựng semantic checker',
      subject: 'PPL',
      tutor: language === 'en' ? 'Nguyen Hua Phung' : 'Nguyen Hua Phung',
      date: language === 'en' ? 'Friday, 2:00 PM' : 'Thứ 6, 2:00 CH',
      participants: 8,
      maxParticipants: 15,
      rating: 4.9,
      description: 'Build a semantic checker for a programming language',
    },
    {
      id: 4,
      title: language === 'en' ? 'Operating Systems Concepts' : 'Khái niệm Hệ điều hành',
      subject: 'Operating Systems',
      tutor: language === 'en' ? 'Le Thanh Van' : 'Le Thanh Van',
      date: language === 'en' ? 'Saturday, 10:00 AM' : 'Thứ 7, 10:00 SA',
      participants: 15,
      maxParticipants: 30,
      rating: 4.7,
      description: 'Understanding process management and scheduling',
    },
    {
      id: 5,
      title: language === 'en' ? 'Design Pattern Practices' : 'Thực hành Design Pattern',
      subject: 'Database Systems',
      tutor: language === 'en' ? 'Mai Duc Trung' : 'Mai Duc Trung',
      date: language === 'en' ? 'Monday, 4:00 PM' : 'Thứ 2, 4:00 CH',
      participants: 10,
      maxParticipants: 20,
      rating: 4.8,
      description: 'Learn concepts of design pattern',
    },
  ]);

  // Filter sessions based on search query
  const filteredMySessions = useMemo(() => {
    if (!searchQuery.trim()) return mySessions;
    const query = searchQuery.toLowerCase();
    return mySessions.filter(session =>
      session.title.toLowerCase().includes(query) ||
      session.subject.toLowerCase().includes(query) ||
      session.tutor.toLowerCase().includes(query) ||
      session.description.toLowerCase().includes(query)
    );
  }, [mySessions, searchQuery]);

  const filteredUpcomingSessions = useMemo(() => {
    // Filter out sessions that are already joined (moved to mySessions)
    const availableSessions = upcomingSessions.filter(s => !joinedSessions.includes(s.id));
    if (!searchQuery.trim()) return availableSessions;
    const query = searchQuery.toLowerCase();
    return availableSessions.filter(session =>
      session.title.toLowerCase().includes(query) ||
      session.subject.toLowerCase().includes(query) ||
      session.tutor.toLowerCase().includes(query) ||
      session.description.toLowerCase().includes(query)
    );
  }, [upcomingSessions, searchQuery, joinedSessions]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.description}</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="my-sessions" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="my-sessions">{t.mySessions}</TabsTrigger>
          <TabsTrigger value="upcoming">{t.upcoming}</TabsTrigger>
        </TabsList>

        {/* My Sessions Tab */}
        <TabsContent value="my-sessions" className="space-y-4">
          {filteredMySessions.map((session) => (
            <Card 
              key={session.id} 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                session.status === 'ongoing' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-purple-500'
              }`}
              onClick={() => {
                if (onNavigate) {
                  onNavigate('consultation-session-detail', session.id);
                }
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{session.title}</CardTitle>
                      {session.status === 'ongoing' && (
                        <Badge className="bg-green-500 text-white border-0">
                          {t.live}
                        </Badge>
                      )}
                      {session.status === 'upcoming' && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-0">
                          {t.registered}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{session.description}</CardDescription>
                  </div>
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {session.tutor.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">{session.tutor}</p>
                        <p className="text-xs text-gray-500">{t.tutor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {session.participants}/{session.maxParticipants} {t.participants}
                      </span>
                      <Badge variant="outline">{session.subject}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <Clock className="h-4 w-4" />
                      {session.date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Upcoming Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUpcomingSessions.map((session) => (
              <Card key={session.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('consultation-session-detail', session.id);
                  }
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{session.title}</CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {session.tutor.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">{session.tutor}</p>
                        <p className="text-xs text-gray-500">{t.tutor}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {session.participants}/{session.maxParticipants}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {session.rating}
                        </span>
                      </div>
                      <Badge variant="outline">{session.subject}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <Clock className="h-4 w-4" />
                      {session.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


