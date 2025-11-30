import { useState } from 'react';
import { Plus, Trophy, Users, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import type { Language } from '../../App';

const mockContests = [
  { id: 1, name: 'Algorithm Challenge 2025', type: 'academic', status: 'open', participants: 45, created: 'Dec 10, 2025' },
  { id: 2, name: 'Data Science Competition', type: 'academic', status: 'closed', participants: 67, created: 'Nov 1, 2025' }
];

interface TutorContestsScreenProps {
  language: Language;
  onNavigate?: (screen: string, contestId?: number) => void;
}

export function TutorContestsScreen({ language, onNavigate }: TutorContestsScreenProps) {
  const [open, setOpen] = useState(false);
  const [contestType, setContestType] = useState('academic');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const t = {
    title: language === 'en' ? 'Contests (Tutor)' : 'Cuộc thi (Cố vấn)',
    create: language === 'en' ? 'Create contest' : 'Tạo cuộc thi',
    name: language === 'en' ? 'Name of contest' : 'Tên cuộc thi',
    description: language === 'en' ? 'Description' : 'Mô tả',
    type: language === 'en' ? 'Contest type' : 'Loại cuộc thi',
    academic: language === 'en' ? 'Academic' : 'Học thuật',
    nonAcademic: language === 'en' ? 'Non-academic' : 'Phi học thuật',
    rules: language === 'en' ? 'Rules and conditions' : 'Quy định và điều kiện',
    prizes: language === 'en' ? 'Prizes' : 'Giải thưởng',
    startDate: language === 'en' ? 'Start date' : 'Ngày bắt đầu',
    endDate: language === 'en' ? 'End date' : 'Ngày kết thúc',
    cancel: language === 'en' ? 'Cancel' : 'Hủy',
    participants: language === 'en' ? 'participants' : 'người tham gia',
    open: language === 'en' ? 'Open' : 'Đang mở',
    closed: language === 'en' ? 'Closed' : 'Đã đóng',
    draft: language === 'en' ? 'Draft' : 'Bản nháp',
    exportResults: language === 'en' ? 'Export results' : 'Xuất kết quả',
    success: language === 'en' ? 'Contest created successfully!' : 'Đã tạo cuộc thi!',
    viewDetails: language === 'en' ? 'View details' : 'Xem chi tiết',
    downloaded: language === 'en' ? 'Downloaded' : 'Đã tải xuống'
  };

  const handleCreate = () => {
    if (!name.trim() || !description.trim()) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    toast.success(t.success);
    setOpen(false);
    setName('');
    setDescription('');
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
              <DialogDescription>Create a new contest for students</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{t.type}</Label>
                <RadioGroup value={contestType} onValueChange={setContestType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="academic" id="academic" />
                    <Label htmlFor="academic" className="cursor-pointer">{t.academic}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-academic" id="non-academic" />
                    <Label htmlFor="non-academic" className="cursor-pointer">{t.nonAcademic}</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">{t.name} *</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t.description} *</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">{t.startDate}</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">{t.endDate}</Label>
                  <Input id="endDate" type="date" />
                </div>
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
        {mockContests.map((contest) => (
          <Card key={contest.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                  <div>
                    <CardTitle>{contest.name}</CardTitle>
                    <CardDescription>Created on {contest.created}</CardDescription>
                  </div>
                </div>
                <Badge variant={contest.status === 'open' ? 'default' : 'secondary'}>
                  {contest.status === 'open' ? t.open : t.closed}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{contest.participants} {t.participants}</span>
                  </div>
                  <Badge variant="outline">{contest.type}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('contest-detail', contest.id);
                      }
                    }}
                  >
                    {t.viewDetails}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success(t.downloaded)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {t.exportResults}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
