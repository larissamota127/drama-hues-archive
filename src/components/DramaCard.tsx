
import React from 'react';
import { Drama } from '@/types/drama';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, Clock, Play } from 'lucide-react';
import StarRating from './StarRating';
import { cn } from '@/lib/utils';

interface DramaCardProps {
  drama: Drama;
  onEdit: (drama: Drama) => void;
  onDelete: (id: string) => void;
}

const DramaCard: React.FC<DramaCardProps> = ({ drama, onEdit, onDelete }) => {
  const getStatusIcon = (status: Drama['status']) => {
    switch (status) {
      case 'watched':
        return <Eye className="w-4 h-4" />;
      case 'watching':
        return <Play className="w-4 h-4" />;
      case 'want-to-watch':
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Drama['status']) => {
    switch (status) {
      case 'watched':
        return 'bg-primary text-white';
      case 'watching':
        return 'bg-purple-500 text-white';
      case 'want-to-watch':
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: Drama['status']) => {
    switch (status) {
      case 'watched':
        return 'Assistido';
      case 'watching':
        return 'Assistindo';
      case 'want-to-watch':
        return 'Quero Assistir';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-accent-50 border-l-4 border-l-primary animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2">
            {drama.title}
          </CardTitle>
          <div className="flex gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(drama)}
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(drama.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-sm font-medium">
            {drama.year}
          </Badge>
          <Badge className={cn('flex items-center gap-1', getStatusColor(drama.status))}>
            {getStatusIcon(drama.status)}
            {getStatusText(drama.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Avaliação:</span>
          <StarRating rating={drama.rating} readonly size="sm" />
        </div>

        {drama.genre && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Gênero:</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {drama.genre}
            </Badge>
          </div>
        )}

        {drama.country && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">País:</span>
            <span className="text-sm text-gray-800 font-medium">{drama.country}</span>
          </div>
        )}

        {drama.episodes && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Episódios:</span>
            <span className="text-sm text-gray-800 font-medium">{drama.episodes}</span>
          </div>
        )}

        {drama.opinion && (
          <div className="mt-3 p-3 bg-gradient-to-r from-accent-50 to-purple-50 rounded-lg border-l-2 border-l-primary">
            <p className="text-sm text-gray-700 italic line-clamp-3">
              "{drama.opinion}"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DramaCard;
