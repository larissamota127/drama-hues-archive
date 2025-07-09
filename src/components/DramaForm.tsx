
import React from 'react';
import { useForm } from 'react-hook-form';
import { Drama, DramaFormData } from '@/types/drama';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import StarRating from './StarRating';

interface DramaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DramaFormData) => void;
  drama?: Drama;
  title: string;
}

const DramaForm: React.FC<DramaFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  drama,
  title
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<DramaFormData>({
    defaultValues: drama || {
      title: '',
      year: new Date().getFullYear(),
      status: 'want-to-watch',
      rating: 0,
      opinion: '',
      genre: '',
      country: '',
      episodes: undefined
    }
  });

  const watchedRating = watch('rating');
  const watchedStatus = watch('status');

  React.useEffect(() => {
    if (drama) {
      reset(drama);
    } else {
      reset({
        title: '',
        year: new Date().getFullYear(),
        status: 'want-to-watch',
        rating: 0,
        opinion: '',
        genre: '',
        country: '',
        episodes: undefined
      });
    }
  }, [drama, reset, isOpen]);

  const handleFormSubmit = (data: DramaFormData) => {
    onSubmit(data);
    onClose();
  };

  const countries = [
    'Coreia do Sul',
    'China',
    'Japão',
    'Tailândia',
    'Taiwan',
    'Filipinas',
    'Indonésia',
    'Vietnã',
    'Singapura',
    'Malásia'
  ];

  const genres = [
    'Romance',
    'Comédia',
    'Drama',
    'Ação',
    'Thriller',
    'Fantasia',
    'Histórico',
    'Médico',
    'Escolar',
    'Família',
    'Suspense',
    'Crime',
    'Melodrama',
    'Slice of Life'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Título *
              </Label>
              <Input
                id="title"
                {...register('title', { required: 'Título é obrigatório' })}
                className="mt-1"
                placeholder="Nome do dorama"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                Ano *
              </Label>
              <Input
                id="year"
                type="number"
                min="1950"
                max={new Date().getFullYear() + 5}
                {...register('year', { 
                  required: 'Ano é obrigatório',
                  valueAsNumber: true,
                  min: { value: 1950, message: 'Ano deve ser maior que 1950' },
                  max: { value: new Date().getFullYear() + 5, message: 'Ano inválido' }
                })}
                className="mt-1"
              />
              {errors.year && (
                <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Status *</Label>
              <Select
                value={watchedStatus}
                onValueChange={(value) => setValue('status', value as Drama['status'])}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="want-to-watch">Quero Assistir</SelectItem>
                  <SelectItem value="watching">Assistindo</SelectItem>
                  <SelectItem value="watched">Assistido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">País</Label>
              <Select
                value={watch('country') || ''}
                onValueChange={(value) => setValue('country', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o país" />
                </SelectTrigger>
                <SelectContent className="max-h-40">
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Gênero</Label>
              <Select
                value={watch('genre') || ''}
                onValueChange={(value) => setValue('genre', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o gênero" />
                </SelectTrigger>
                <SelectContent className="max-h-40">
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="episodes" className="text-sm font-medium text-gray-700">
                Número de Episódios
              </Label>
              <Input
                id="episodes"
                type="number"
                min="1"
                {...register('episodes', { valueAsNumber: true })}
                className="mt-1"
                placeholder="Ex: 16"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="text-sm font-medium text-gray-700">
                Avaliação
              </Label>
              <div className="mt-2">
                <StarRating
                  rating={watchedRating}
                  onRatingChange={(rating) => setValue('rating', rating)}
                  size="lg"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="opinion" className="text-sm font-medium text-gray-700">
                Opinião
              </Label>
              <Textarea
                id="opinion"
                {...register('opinion')}
                className="mt-1 min-h-[100px]"
                placeholder="Compartilhe sua opinião sobre este dorama..."
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
            >
              {drama ? 'Atualizar' : 'Adicionar'} Dorama
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DramaForm;
