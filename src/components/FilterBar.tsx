
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { Drama } from '@/types/drama';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  yearFilter: string;
  onYearFilterChange: (year: string) => void;
  ratingFilter: string;
  onRatingFilterChange: (rating: string) => void;
  countryFilter: string;
  onCountryFilterChange: (country: string) => void;
  genreFilter: string;
  onGenreFilterChange: (genre: string) => void;
  onClearFilters: () => void;
  dramas: Drama[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  yearFilter,
  onYearFilterChange,
  ratingFilter,
  onRatingFilterChange,
  countryFilter,
  onCountryFilterChange,
  genreFilter,
  onGenreFilterChange,
  onClearFilters,
  dramas
}) => {
  const uniqueYears = Array.from(new Set(dramas.map(d => d.year))).sort((a, b) => b - a);
  const uniqueCountries = Array.from(new Set(dramas.map(d => d.country).filter(Boolean)));
  const uniqueGenres = Array.from(new Set(dramas.map(d => d.genre).filter(Boolean)));

  const hasActiveFilters = statusFilter || yearFilter || ratingFilter || countryFilter || genreFilter;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Pesquisar doramas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="watched">Assistido</SelectItem>
            <SelectItem value="watching">Assistindo</SelectItem>
            <SelectItem value="want-to-watch">Quero Assistir</SelectItem>
          </SelectContent>
        </Select>

        <Select value={yearFilter} onValueChange={onYearFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent className="max-h-40">
            <SelectItem value="all">Todos os Anos</SelectItem>
            {uniqueYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={ratingFilter} onValueChange={onRatingFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Avaliação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Avaliações</SelectItem>
            <SelectItem value="5">★★★★★ (5 estrelas)</SelectItem>
            <SelectItem value="4">★★★★☆ (4+ estrelas)</SelectItem>
            <SelectItem value="3">★★★☆☆ (3+ estrelas)</SelectItem>
            <SelectItem value="2">★★☆☆☆ (2+ estrelas)</SelectItem>
            <SelectItem value="1">★☆☆☆☆ (1+ estrela)</SelectItem>
          </SelectContent>
        </Select>

        {uniqueCountries.length > 0 && (
          <Select value={countryFilter} onValueChange={onCountryFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="País" />
            </SelectTrigger>
            <SelectContent className="max-h-40">
              <SelectItem value="all">Todos os Países</SelectItem>
              {uniqueCountries.map((country) => (
                <SelectItem key={country} value={country!}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {uniqueGenres.length > 0 && (
          <Select value={genreFilter} onValueChange={onGenreFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Gênero" />
            </SelectTrigger>
            <SelectContent className="max-h-40">
              <SelectItem value="all">Todos os Gêneros</SelectItem>
              {uniqueGenres.map((genre) => (
                <SelectItem key={genre} value={genre!}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
