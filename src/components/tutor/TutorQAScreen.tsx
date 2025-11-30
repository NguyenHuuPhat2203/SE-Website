import { MessageSquare } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Language } from '../../App';

interface TutorQAScreenProps {
  language: Language;
  onNavigate?: (screen: string, questionId?: number) => void;
}

const mockQuestions = [
  { id: 1, title: 'How to implement Binary Search Tree?', author: 'Student A', content: 'I am struggling with the implementation of BST insert method. Can you help explain the recursive approach?', time: '2 hours ago', topic: 'Data Structures', tags: ['BST', 'Trees'], answered: false },
  { id: 2, title: 'Explain Dynamic Programming approach', author: 'Student B', content: 'What is the difference between memoization and tabulation in DP?', time: '5 hours ago', topic: 'Algorithms', tags: ['DP', 'Optimization'], answered: false },
  { id: 3, title: 'Database normalization best practices?', author: 'Student C', content: 'When should I use 3NF vs BCNF?', time: '1 day ago', topic: 'Database', tags: ['SQL', 'Normalization'], answered: false }
];

export function TutorQAScreen({ language, onNavigate }: TutorQAScreenProps) {
  const t = {
    title: language === 'en' ? 'Answer Questions' : 'Trả lời câu hỏi',
    unanswered: language === 'en' ? 'Unanswered' : 'Chưa trả lời',
    from: language === 'en' ? 'From' : 'Từ'
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-gray-900">{t.title}</h1>
      </div>

      {mockQuestions.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-gray-500">No unanswered questions</CardContent>
        </Card>
      ) : (
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
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900">{q.title}</h3>
                      <Badge variant="secondary">{t.unanswered}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{q.content}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>
                        {t.from} {q.author}
                      </span>
                      <span>•</span>
                      <span>{q.time}</span>
                      <span>•</span>
                      <Badge variant="outline">{q.topic}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {q.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <MessageSquare className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
