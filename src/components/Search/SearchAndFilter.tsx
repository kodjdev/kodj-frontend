import styled from 'styled-components';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import themeColors from '@/tools/themeColors';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { JOB_RECOMMENDATIONS, JOB_TYPES, REGIONS } from '@/constant/jobsPresets';
import { useEffect, useState } from 'react';
import { SearchCodeIcon } from 'lucide-react';

type SearchAndFilterProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedRegion: string;
    onRegionChange: (region: string) => void;
    selectedJobType: string;
    onJobTypeChange: (jobType: string) => void;
    onClearFilters: () => void;
    onSearchSubmit: () => void;
    translations: {
        title: string;
        clearFilters: string;
        searchJobs: string;
        searchPlaceholder: string;
        location: string;
        jobType: string;
    };
};

const FilterContainer = styled.div`
    background-color: ${themeColors.colors.gray.dark};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: 12px;
    padding: ${themeColors.spacing.lg};
    margin-bottom: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const FilterHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        align-items: flex-start;
        gap: ${themeColors.spacing.xs};
    }
`;

const FilterTitle = styled.h3`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    margin: 0;
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.sm};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h5.fontSize}px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;

        svg {
            font-size: 16px;
            color: ${themeColors.colors.primary.hover};
            flex-shrink: 0;
            margin-right: ${themeColors.spacing.xs};
        }
    }
`;

const FilterRow = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 0.8fr auto;
    gap: ${themeColors.spacing.md};
    align-items: end;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: ${themeColors.spacing.xs};
    }
`;

const FilterGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.xs};
`;

const FilterLabel = styled.label`
    color: ${themeColors.cardBorder.color};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
    padding-bottom: ${themeColors.spacing.xs};
    line-height: 1;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding-top: ${themeColors.spacing.sm};
        padding-bottom: ${themeColors.spacing.sm};
        font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    }
`;

const Select = styled.select`
    width: 100%;
    background-color: ${themeColors.colors.black.background};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: 8px;
    height: 42px;
    padding: 0 ${themeColors.spacing.sm};
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;

    &:focus {
        outline: none;
        border-color: ${themeColors.colors.primary.main};
        box-shadow: 0 0 0 2px rgba(${themeColors.colors.primary.main}, 0.2);
    }

    option {
        background-color: ${themeColors.colors.gray.background};
        color: ${themeColors.colors.gray.text};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    }
`;

const SuggestionsDropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${themeColors.colors.gray.dark};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
`;

const SuggestionItem = styled.div<{ isSelected?: boolean }>`
    padding: 6px 12px;
    color: ${themeColors.colors.neutral.white};
    cursor: pointer;
    background-color: ${({ isSelected }) => (isSelected ? themeColors.colors.ui.dimmed : 'transparent')};
    font-size: ${themeColors.typography.body.small.fontSize}px;

    &:hover {
        background-color: ${themeColors.colors.gray.background};
        color: ${themeColors.colors.tags.ai.text};
    }

    &:last-child {
        border-bottom: none;
    }
`;

const ResponsiveSearchButton = styled(Button)`
    align-self: flex-end;
    min-width: 44px;
    width: 44px;
    height: 42px;
    padding: 0;
    border-radius: 8px;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        width: 100%;
        min-width: 100%;
        margin-top: ${themeColors.spacing.md};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 100%;
        min-width: 100%;
        margin-top: ${themeColors.spacing.md};
    }
`;

/**
 * SearchAndFilter - Organism Component
 * This component provides a search and filter interface for job listings.
 * It includes a search input with suggestions, region and job type selectors,
 * and a clear filters button.
 * @param {SearchAndFilterProps} props - The properties for the component.
 */
export default function SearchAndFilter({
    searchTerm,
    onSearchChange,
    selectedRegion,
    onRegionChange,
    selectedJobType,
    onJobTypeChange,
    onClearFilters,
    onSearchSubmit,
    translations,
}: SearchAndFilterProps) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

    useEffect(() => {
        if (searchTerm.length >= 2) {
            const filtered = JOB_RECOMMENDATIONS.filter((suggestion) =>
                suggestion.toLowerCase().includes(searchTerm.toLowerCase()),
            ).slice(0, 5);
            setFilteredSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
            setSelectedSuggestionIndex(-1);
        } else {
            setShowSuggestions(false);
            setFilteredSuggestions([]);
            setSelectedSuggestionIndex(-1);
        }
    }, [searchTerm]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedSuggestionIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0));
                break;

            case 'ArrowUp':
                e.preventDefault();
                setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1));
                break;

            case 'Enter':
                e.preventDefault();
                if (selectedSuggestionIndex >= 0 && filteredSuggestions[selectedSuggestionIndex]) {
                    onSearchChange(filteredSuggestions[selectedSuggestionIndex]);
                    setShowSuggestions(false);
                    setSelectedSuggestionIndex(-1);
                } else {
                    onSearchSubmit();
                }
                break;

            case 'Escape':
                setShowSuggestions(false);
                setSelectedSuggestionIndex(-1);
                break;

            default:
                break;
        }
    };

    const hasActiveFilters = searchTerm || selectedRegion || selectedJobType;

    return (
        <FilterContainer>
            <FilterHeader>
                <FilterTitle>
                    <SearchCodeIcon size={24} />
                    {translations.title || 'Search and Filter Jobs'}
                </FilterTitle>
                {hasActiveFilters && (
                    <Button onClick={onClearFilters} size="sm" variant="navItem">
                        {translations.clearFilters || 'Clear Filters'}
                    </Button>
                )}
            </FilterHeader>

            <FilterRow>
                <FilterGroup>
                    <FilterLabel htmlFor="job-search">Search Jobs</FilterLabel>
                    <div style={{ position: 'relative' }}>
                        <Input
                            id="job-search"
                            type="text"
                            placeholder="Job title, company, or keywords..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => filteredSuggestions.length > 0 && setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            icon={<FaSearch size={16} />}
                            iconPosition="left"
                            fullWidth
                            transparent
                            size="xs"
                        />
                        {showSuggestions && (
                            <SuggestionsDropdown>
                                {filteredSuggestions.map((suggestion, index) => (
                                    <SuggestionItem
                                        key={index}
                                        isSelected={index === selectedSuggestionIndex}
                                        onClick={() => {
                                            onSearchChange(suggestion);
                                            setShowSuggestions(false);
                                            setSelectedSuggestionIndex(-1);
                                        }}
                                    >
                                        {suggestion}
                                    </SuggestionItem>
                                ))}
                            </SuggestionsDropdown>
                        )}
                    </div>
                </FilterGroup>

                <FilterGroup>
                    <FilterLabel htmlFor="region-select">
                        <FaMapMarkerAlt />
                        {translations.location || 'Location'}
                    </FilterLabel>
                    <Select id="region-select" value={selectedRegion} onChange={(e) => onRegionChange(e.target.value)}>
                        {REGIONS.map((region) => (
                            <option key={region.value} value={region.value}>
                                {region.label}
                            </option>
                        ))}
                    </Select>
                </FilterGroup>

                <FilterGroup style={{ flex: 0.8 }}>
                    <FilterLabel htmlFor="job-type-select">
                        <FaBriefcase />
                        {translations.jobType || 'Job Type'}
                    </FilterLabel>
                    <Select
                        id="job-type-select"
                        value={selectedJobType}
                        onChange={(e) => onJobTypeChange(e.target.value)}
                    >
                        {JOB_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </Select>
                </FilterGroup>
                <FilterGroup>
                    <ResponsiveSearchButton variant="light" size="xs" onClick={onSearchSubmit}>
                        <FaSearch size={16} />
                    </ResponsiveSearchButton>
                </FilterGroup>
            </FilterRow>
        </FilterContainer>
    );
}
