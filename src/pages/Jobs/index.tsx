import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import JobCard, { JobCardProps } from '@/components/Card/JobsCard';
import SearchAndFilter from '@/components/Search/SearchAndFilter';
import { JobOfferStatus, JobType } from '@/services/api/types/jobs';
import { transformJobPostToCardProps } from '@/utils/jobsHelper';
import EmptyState from '@/components/EmptyState';
import { FileWarning } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useApiService from '@/services';

type SortOption = 'newest' | 'oldest' | 'company' | 'salary';

const Container = styled.div`
    max-width: ${themeColors.breakpoints.desktop};
    margin: 0 auto;
    min-height: 100vh;
    background-color: ${themeColors.colors.neutral.black};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: 0;
    }
`;

const ResultsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        align-items: flex-start;
        gap: ${themeColors.spacing.sm};
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const ResultsCount = styled.p`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    margin: 0;
`;

const SortSelect = styled.select`
    background-color: ${themeColors.colors.gray.dark};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: 8px;
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;

    &:focus {
        outline: none;
        border-color: ${themeColors.colors.primary.main};
    }

    option {
        background-color: ${themeColors.colors.gray.dark};
        color: ${themeColors.colors.neutral.white};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.small.fontSize}px;
        width: 100%;
        padding: ${themeColors.spacing.sm} ${themeColors.spacing.sm};
    }
`;

const JobsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: ${themeColors.spacing.xl};
    margin-bottom: ${themeColors.spacing.xxl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: ${themeColors.spacing.md};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        grid-template-columns: 1fr;
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const LoadMoreContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: ${themeColors.spacing.xl};
`;

const LoadMoreButton = styled(Button)`
    background: linear-gradient(135deg, ${themeColors.colors.primary.main} 0%, ${themeColors.colors.primary.dark} 100%);
    border: none;
    padding: ${themeColors.spacing.md} ${themeColors.spacing.xl};
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(${themeColors.colors.primary.main}, 0.3);
    }
`;

const NoJobsContainer = styled.div`
    text-align: center;
    padding: ${themeColors.spacing.xxl} ${themeColors.spacing.lg};
    color: ${themeColors.colors.gray.text};
`;

const NoJobsTitle = styled.h3`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
    margin-bottom: ${themeColors.spacing.md};
`;

const NoJobsText = styled.p`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.6;
    max-width: 400px;
    margin: 0 auto ${themeColors.spacing.lg} auto;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.large.fontSize}px;
`;

const EmptyStateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
`;

/**
 * JobsList - Page Component
 * @description - This component fetches job listings from the API,
 * allows users to search and filter jobs based on various criteria,
 * and displays the results in a grid format. It also handles loading states,
 * error handling, and pagination for job listings.
 */
export default function JobsList() {
    const navigate = useNavigate();
    const { getJobs, searchJobs } = useApiService();

    const { t } = useTranslation('jobs');

    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastSearchParamsRef = useRef<string>('');

    const [jobs, setJobs] = useState<JobCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedJobType, setSelectedJobType] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
    const [submittedRegion, setSubmittedRegion] = useState('');
    const [submittedJobType, setSubmittedJobType] = useState('');

    const fetchJobs = useCallback(
        async (page: number = 0, append: boolean = false) => {
            const currentSearchParams = JSON.stringify({
                searchTerm: submittedSearchTerm,
                selectedRegion: submittedRegion,
                selectedJobType: submittedJobType,
                sortBy,
                page,
            });

            if (!append && currentSearchParams === lastSearchParamsRef.current) {
                return;
            }

            if (!append) {
                setLoading(true);
                setError(null);
                lastSearchParamsRef.current = currentSearchParams;
            }

            try {
                const params = {
                    page,
                    size: 12,
                    jobOfferStatus: 'OPEN' as JobOfferStatus,
                    jobType: submittedJobType
                        ? (submittedJobType.toUpperCase().replace('-', '_') as JobType)
                        : 'FULL_TIME',
                    ...(sortBy === 'newest' && { sort: 'createdAt,desc' }),
                    ...(sortBy === 'oldest' && { sort: 'createdAt,asc' }),
                    ...(sortBy === 'company' && { sort: 'companyName,asc' }),
                };

                let response;
                const searchTermTrimmed = submittedSearchTerm.trim();

                if (searchTermTrimmed) {
                    response = await searchJobs(searchTermTrimmed, params);
                } else {
                    response = await getJobs(params);
                }

                if (response.statusCode === 200 && response.data) {
                    const responseData = response.data;

                    if (responseData?.content && Array.isArray(responseData.content)) {
                        const transformedJobs = responseData.content.map((job) => transformJobPostToCardProps(job));

                        if (append) {
                            setJobs((prev) => [...prev, ...transformedJobs]);
                        } else {
                            setJobs(transformedJobs);
                        }

                        setCurrentPage(responseData.number);
                        setTotalPages(responseData.totalPages);
                        setTotalElements(responseData.totalElements);
                        setHasMore(!responseData.last);
                        setError(null);
                    } else {
                        setJobs([]);
                        setTotalElements(0);
                        setTotalPages(0);
                        setHasMore(false);
                    }
                } else {
                    throw new Error(response.message || 'Failed to fetch jobs');
                }
            } catch (apiError) {
                const errorMessage = (apiError as Error).message || 'Failed to fetch jobs. Please try again.';
                setError(errorMessage);

                if (!append) {
                    setJobs([]);
                    setTotalElements(0);
                    setTotalPages(0);
                    setHasMore(false);
                }
            } finally {
                setLoading(false);
            }
        },
        [getJobs, searchJobs],
    );

    useEffect(() => {
        fetchJobs(0, false);
    }, [fetchJobs]);

    useEffect(() => {
        if (submittedSearchTerm || selectedRegion || selectedJobType) {
            fetchJobs(0, false);
        } else {
            fetchJobs(0, false);
        }
    }, [submittedSearchTerm, submittedRegion, submittedJobType, sortBy, fetchJobs]);

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        fetchJobs(0, false);
    }, [fetchJobs]);

    const filteredJobs = selectedRegion
        ? jobs.filter((job) => {
              if (selectedRegion === 'remote') return job.isRemote;
              return job.location.toLowerCase().includes(selectedRegion.toLowerCase());
          })
        : jobs;

    const handleClearFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedRegion('');
        setSelectedJobType('');
        setSortBy('newest');
        setSubmittedSearchTerm('');
        setSubmittedRegion('');
        setSubmittedJobType('');
    }, []);

    const handleJobClick = (jobId: string | undefined) => {
        if (jobId) {
            navigate(`/jobs/${jobId}`);
        }
    };

    const handleLoadMore = useCallback(() => {
        const nextPage = currentPage + 1;
        if (nextPage < totalPages && !loading) {
            fetchJobs(nextPage, true);
        }
    }, [currentPage, totalPages, loading, fetchJobs]);

    const getSearchProps = () => ({
        searchTerm,
        selectedRegion,
        selectedJobType,
        onSearchChange: setSearchTerm,
        onRegionChange: setSelectedRegion,
        onJobTypeChange: setSelectedJobType,
        onClearFilters: handleClearFilters,
    });

    const getTranslations = () => ({
        title: t('search.title'),
        clearFilters: t('search.clearFilters'),
        searchJobs: t('search.searchJobs'),
        searchPlaceholder: t('search.placeholder'),
        location: t('search.location'),
        jobType: t('search.jobType'),
    });

    const handleSearchSubmit = () => {
        setSubmittedSearchTerm(searchTerm);
        setSubmittedRegion(selectedRegion);
        setSubmittedJobType(selectedJobType);
    };

    if (loading && jobs.length === 0) {
        return (
            <Container>
                <LoadingContainer>{t('results.loadingJobs')}</LoadingContainer>
            </Container>
        );
    }

    if (error && jobs.length === 0) {
        return (
            <EmptyStateContainer>
                <EmptyState
                    title={t('results.errorTitle')}
                    description={error}
                    buttonText={t('results.goToHomepage')}
                    buttonVariant="outline"
                    buttonSize="sm"
                    onButtonClick={() => navigate('/')}
                    icon={<FileWarning style={{ width: '48px', height: '48px' }} />}
                    showLogo={false}
                    showIcon={true}
                />
            </EmptyStateContainer>
        );
    }

    return (
        <Container>
            <SearchAndFilter
                {...getSearchProps()}
                selectedRegion=""
                onSearchSubmit={handleSearchSubmit}
                translations={getTranslations()}
            />

            <ResultsHeader>
                <ResultsCount>
                    {loading ? t('results.searching') : `${totalElements} ${t('results.jobsFound')}`}
                    {!loading && submittedSearchTerm && ` for "${submittedSearchTerm}"`}
                </ResultsCount>

                <SortSelect id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
                    <option value="newest">{t('results.sortNewest')}</option>
                    <option value="oldest">{t('results.sortOldest')}</option>
                    <option value="company">{t('results.sortCompany')}</option>
                </SortSelect>
            </ResultsHeader>

            {filteredJobs.length === 0 ? (
                <NoJobsContainer>
                    <NoJobsTitle>{t('results.noJobsTitle')}</NoJobsTitle>
                    <NoJobsText>
                        {submittedSearchTerm || selectedRegion || selectedJobType
                            ? t('results.noJobsDescription')
                            : t('results.noJobsAvailable')}
                    </NoJobsText>
                    {(submittedSearchTerm || selectedRegion || selectedJobType) && (
                        <Button variant="outline" size="sm" onClick={handleClearFilters}>
                            {t('results.clearAllFilters')}
                        </Button>
                    )}
                </NoJobsContainer>
            ) : (
                <>
                    <JobsGrid>
                        {filteredJobs.map((job) => (
                            <JobCard key={job.id} {...job} onClick={() => handleJobClick(job.id)} />
                        ))}
                    </JobsGrid>

                    {hasMore && !selectedRegion && (
                        <LoadMoreContainer>
                            <LoadMoreButton variant="primary" size="lg" onClick={handleLoadMore} disabled={loading}>
                                {loading ? t('results.loading') : t('results.loadMoreJobs')}
                            </LoadMoreButton>
                        </LoadMoreContainer>
                    )}
                </>
            )}
        </Container>
    );
}
