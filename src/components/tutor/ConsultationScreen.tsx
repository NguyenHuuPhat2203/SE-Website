import { useState } from 'react';
import { Plus, MapPin, Video } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import type { Language } from '../../App';

const mockSessions = [
  { id: 1, title: 'Data Structures - Binary Trees', date: 'Dec 20, 2025', time: '14:00 - 15:00', type: 'offline', location: 'Room A1-101', students: 5 },
  { id: 2, title: 'Algorithm Analysis', date: 'Dec 21, 2025', time: '10:00 - 11:30', type: 'online', location: 'https://teams.microsoft.com/...', students: 8 },
  { id: 3, title: 'Dynamic Programming', date: 'Dec 22, 2025', time: '15:00 - 16:00', type: 'offline', location: 'Room B2-205', students: 6 }
];

interface ConsultationScreenProps {
  language: Language;
  onNavigate?: (screen: string, sessionId?: number) => void;
}

export function ConsultationScreen({ language, onNavigate }: ConsultationScreenProps) {
  const [open, setOpen] = useState(false);
  const [sessionType, setSessionType] = useState('in-person');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const t = {
    title: language === 'en' ? 'Consultation Sessions' : 'Buổi tư vấn',
    create: language === 'en' ? 'Create consultation session' : 'Tạo buổi tư vấn',
    date: language === 'en' ? 'Date' : 'Ngày',
    time: language === 'en' ? 'Time' : 'Thời gian',
    type: language === 'en' ? 'Type' : 'Loại',
    inPerson: language === 'en' ? 'In-person' : 'Trực tiếp',
    online: language === 'en' ? 'Online' : 'Trực tuyến',
    location: language === 'en' ? 'Location' : 'Địa điểm',
    meetingLink: language === 'en' ? 'Meeting link' : 'Liên kết cuộc họp',
    description: language === 'en' ? 'Description and objectives' : 'Mô tả và mục tiêu',
    cancel: language === 'en' ? 'Cancel' : 'Hủy',
    students: language === 'en' ? 'students' : 'sinh viên',
    success: language === 'en' ? 'Session created successfully!' : 'Đã tạo buổi tư vấn!',
    view: language === 'en' ? 'View' : 'Xem'
  };

  const handleCreate = () => {
    toast.success(t.success);
    setOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-gray-900">{t.title}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t.create}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{t.create}</DialogTitle>
              <DialogDescription>Schedule a new consultation session</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">{t.date}</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">{t.time}</Label>
                  <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t.type}</Label>
                <RadioGroup value={sessionType} onValueChange={setSessionType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-person" id="in-person" />
                    <Label htmlFor="in-person" className="cursor-pointer">{t.inPerson}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="cursor-pointer">{t.online}</Label>
                  </div>
                </RadioGroup>
              </div>
              {sessionType === 'in-person' ? (
                <div className="space-y-2">
                  <Label htmlFor="location">{t.location}</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A1-101">Room A1-101</SelectItem>
                      <SelectItem value="A1-102">Room A1-102</SelectItem>
                      <SelectItem value="B2-205">Room B2-205</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="link">{t.meetingLink}</Label>
                  <Input id="link" placeholder="https://teams.microsoft.com/..." value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="description">{t.description}</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>{t.cancel}</Button>
              <Button onClick={handleCreate}>{t.create}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {mockSessions.map((session) => (
          <Card key={session.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">{session.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span>{session.date} • {session.time}</span>
                    <Badge variant={session.type === 'online' ? 'default' : 'secondary'}>
                      {session.type === 'in-person' ? (
                        <><MapPin className="h-3 w-3 mr-1" />{t.inPerson}</>
                      ) : (
                        <><Video className="h-3 w-3 mr-1" />{t.online}</>
                      )}
                    </Badge>
                    <span>{session.students} {t.students}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{session.location}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('consultation-session-detail', session.id);
                    }
                  }}
                >
                  {t.view}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
