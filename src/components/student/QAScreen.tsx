import { useState } from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import type { Language } from '../../App';

const mockQuestions = [
  { id: 1, title: 'How to implement Binary Search Tree?', author: 'Nguyen Huu Phat', time: '2 hours ago', answers: 2, status: 'answered', topic: 'Data Structures', tags: ['BST', 'Trees'] },
  { id: 2, title: 'Explain Dynamic Programming approach', author: 'Nguyen Trong Nghia', time: '5 hours ago', answers: 1, status: 'answered', topic: 'Algorithms', tags: ['DP', 'Optimization'] },
  { id: 3, title: 'Database normalization best practices?', author: 'Doan Manh Tat', time: '1 day ago', answers: 0, status: 'unanswered', topic: 'Database', tags: ['SQL', 'Normalization'] }
];

interface QAScreenProps {
  language: Language;
  onNavigate?: (screen: string, questionId?: number) => void;
}

export function QAScreen({ language, onNavigate }: QAScreenProps) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const t = {
    title: language === 'en' ? 'Ask a Question' : 'Đặt câu hỏi',
    newQuestion: language === 'en' ? 'Create new topic' : 'Tạo chủ đề mới',
    topic: language === 'en' ? 'Topic' : 'Chủ đề',
    questionTitle: language === 'en' ? 'Question Title' : 'Tiêu đề câu hỏi',
    questionContent: language === 'en' ? 'Question Content' : 'Nội dung câu hỏi',
    post: language === 'en' ? 'Post question' : 'Đăng câu hỏi',
    cancel: language === 'en' ? 'Cancel' : 'Hủy',
    answers: language === 'en' ? 'answers' : 'câu trả lời',
    answered: language === 'en' ? 'Answered' : 'Đã trả lời',
    unanswered: language === 'en' ? 'Unanswered' : 'Chưa trả lời',
    success: language === 'en' ? 'Question posted successfully!' : 'Đã đăng câu hỏi!'
  };

  const handlePost = () => {
    toast.success(t.success);
    setOpen(false);
    setTopic('');
    setTitle('');
    setContent('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-gray-900">{t.title}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t.newQuestion}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{t.newQuestion}</DialogTitle>
              <DialogDescription>Ask a question to the community</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="topic">{t.topic}</Label>
                <Select value={topic} onValueChange={setTopic}>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data-structures">Data Structures</SelectItem>
                    <SelectItem value="algorithms">Algorithms</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">{t.questionTitle}</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">{t.questionContent}</Label>
                <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>{t.cancel}</Button>
              <Button onClick={handlePost}>{t.post}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {mockQuestions.map((q) => (
          <Card
            key={q.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              if (onNavigate) {
                onNavigate('question-detail', q.id);
              }
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">{q.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{q.author}</span>
                    <span>•</span>
                    <span>{q.time}</span>
                    <span>•</span>
                    <Badge variant="outline">{q.topic}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {q.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MessageSquare className="h-4 w-4" />
                    <span>{q.answers} {t.answers}</span>
                  </div>
                  <Badge variant={q.status === 'answered' ? 'default' : 'secondary'}>
                    {q.status === 'answered' ? t.answered : t.unanswered}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
