
import React, { useState, useMemo } from 'react';
import { Drama, DramaFormData } from '@/types/drama';
import DramaCard from '@/components/DramaCard';
import DramaForm from '@/components/DramaForm';
import FilterBar from '@/components/FilterBar';
import { Button } from '@/components/ui/button';
import { Plus, Tv, TrendingUp, Eye, Clock, Play, Heart } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDrama, setEditingDrama] = useState<Drama | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');

  const handleAddDrama = (data: DramaFormData) => {
    const newDrama: Drama = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setDramas([...dramas, newDrama]);
    toast.success('Dorama adicionado com sucesso!');
  };

  const handleEditDrama = (data: DramaFormData) => {
    if (!editingDrama) return;
    
    const updatedDrama: Drama = {
      ...editingDrama,
      ...data,
      updatedAt: new Date(),
    };
    
    setDramas(dramas.map(d => d.id === editingDrama.id ? updatedDrama : d));
    setEditingDrama(undefined);
    toast.success('Dorama atualizado com sucesso!');
  };

  const handleDeleteDrama = (id: string) => {
    setDramas(dramas.filter(d => d.id !== id));
    toast.success('Dorama removido com sucesso!');
  };

  const openEditForm = (drama: Drama) => {
    setEditingDrama(drama);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingDrama(undefined);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setYearFilter('all');
    setRatingFilter('all');
    setCountryFilter('all');
    setGenreFilter('all');
  };

  const filteredDramas = useMemo(() => {
    return dramas.filter(drama => {
      const matchesSearch = drama.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          drama.opinion?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || drama.status === statusFilter;
      const matchesYear = yearFilter === 'all' || drama.year.toString() === yearFilter;
      const matchesRating = ratingFilter === 'all' || drama.rating >= parseInt(ratingFilter);
      const matchesCountry = countryFilter === 'all' || drama.country === countryFilter;
      const matchesGenre = genreFilter === 'all' || drama.genre === genreFilter;

      return matchesSearch && matchesStatus && matchesYear && matchesRating && matchesCountry && matchesGenre;
    });
  }, [dramas, searchTerm, statusFilter, yearFilter, ratingFilter, countryFilter, genreFilter]);

  const stats = useMemo(() => {
    const watched = dramas.filter(d => d.status === 'watched').length;
    const watching = dramas.filter(d => d.status === 'watching').length;
    const wantToWatch = dramas.filter(d => d.status === 'want-to-watch').length;
    const avgRating = dramas.length > 0 ? 
      dramas.reduce((sum, d) => sum + d.rating, 0) / dramas.length : 0;

    return { watched, watching, wantToWatch, avgRating };
  }, [dramas]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Tv className="w-10 h-10" />
                Doramas da Siu
                <Heart className="w-8 h-8 text-pink-300" />
              </h1>
              <p className="text-xl text-white/90 mt-2">
                Organize e acompanhe seus doramas favoritos
              </p>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Dorama
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-primary hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.watched}</p>
                <p className="text-gray-600">Assistidos</p>
              </div>
              <Eye className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.watching}</p>
                <p className="text-gray-600">Assistindo</p>
              </div>
              <Play className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-gray-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.wantToWatch}</p>
                <p className="text-gray-600">Quero Assistir</p>
              </div>
              <Clock className="w-8 h-8 text-gray-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.avgRating.toFixed(1)}
                </p>
                <p className="text-gray-600">Média de Avaliação</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          yearFilter={yearFilter}
          onYearFilterChange={setYearFilter}
          ratingFilter={ratingFilter}
          onRatingFilterChange={setRatingFilter}
          countryFilter={countryFilter}
          onCountryFilterChange={setCountryFilter}
          genreFilter={genreFilter}
          onGenreFilterChange={setGenreFilter}
          onClearFilters={clearFilters}
          dramas={dramas}
        />

        {/* Drama Grid */}
        <div className="mt-8">
          {filteredDramas.length === 0 ? (
            <div className="text-center py-16">
              <Tv className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                {dramas.length === 0 ? 'Nenhum dorama adicionado ainda' : 'Nenhum dorama encontrado'}
              </h3>
              <p className="text-gray-500 mb-6">
                {dramas.length === 0 
                  ? 'Comece adicionando seu primeiro dorama à coleção!'
                  : 'Tente ajustar os filtros para encontrar o que procura.'
                }
              </p>
              {dramas.length === 0 && (
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Primeiro Dorama
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredDramas.length} dorama{filteredDramas.length !== 1 ? 's' : ''} encontrado{filteredDramas.length !== 1 ? 's' : ''}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDramas.map((drama) => (
                  <DramaCard
                    key={drama.id}
                    drama={drama}
                    onEdit={openEditForm}
                    onDelete={handleDeleteDrama}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Form Modal */}
      <DramaForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingDrama ? handleEditDrama : handleAddDrama}
        drama={editingDrama}
        title={editingDrama ? 'Editar Dorama' : 'Adicionar Novo Dorama'}
      />
    </div>
  );
};

export default Index;
