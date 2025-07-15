import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PersonStanding, ThumbsUp } from 'lucide-react';
import Button from '@/components/Button/Button';
import themeColors from '@/tools/themeColors';
import useAuth from '@/context/useAuth';
import useApiService from '@/services';
import { CommentData } from '@/types/news';

type Comment = {
    id: string | number;
    author: string;
    date: string;
    text: string;
    likes: number;
    replies?: Comment[];
    avatar?: string;
};

type CommentsProps = {
    articleId: string;
    initialComments?: Comment[];
};

const CommentsContainer = styled.div`
    margin-top: ${themeColors.spacing.xl};
    padding: ${themeColors.spacing.lg};
    background-color: #161616;
    border-radius: 16px;
    border: 1px solid ${themeColors.cardBorder.color};
    overflow: hidden;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        border-radius: 12px;
    }
`;

const CommentsHeader = styled.h3`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    margin-bottom: ${themeColors.spacing.lg};
    margin-top: 0;
`;

const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.lg};
`;

const CommentCard = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
`;

const CommentItem = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
    padding-bottom: ${themeColors.spacing.md};
    width: 100%;
`;

const CommentReplies = styled.div`
    margin-left: 56px;
    margin-top: ${themeColors.spacing.md};
`;

const CommentReply = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
    padding-bottom: ${themeColors.spacing.md};
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding-left: ${themeColors.spacing.md};
`;

const CommentAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #333;
    overflow: hidden;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const CommentContent = styled.div`
    flex: 1;
`;

const CommentAuthor = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.xs};
`;

const AuthorName = styled.span`
    color: ${themeColors.colors.neutral.white};
    font-weight: 500;
`;

const CommentDate = styled.span`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;

const CommentText = styled.p`
    color: ${themeColors.colors.neutral.white};
    margin-bottom: ${themeColors.spacing.sm};
    word-break: break-word;
`;

const CommentActions = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
`;

const CommentAction = styled.button`
    background: transparent;
    border: none;
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};

    &:hover {
        color: ${themeColors.colors.primary.main};
    }
`;

const CommentInput = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.xl};
    margin-top: ${themeColors.spacing.md};
    flex-wrap: wrap;
    flex-direction: row;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        align-items: flex-start;
        gap: ${themeColors.spacing.sm};
    }
`;

const CommentTextArea = styled.textarea`
    width: 100%;
    background-color: rgba(30, 30, 30, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: ${themeColors.colors.neutral.white};
    padding: ${themeColors.spacing.md};
    min-height: 60px;
    max-width: 100%;
    resize: none;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${themeColors.colors.primary.main};
    }

    &::placeholder {
        color: ${themeColors.colors.gray.main};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.sm};
        min-height: 50px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${themeColors.spacing.md};
    margin-top: ${themeColors.spacing.md};
    width: 100%;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        justify-content: flex-end;
        gap: ${themeColors.spacing.sm};
    }
`;

/**
 * Comments Component
 * @param articleId - The ID of the article to which comments belong
 * @param initialComments - Optional array of initial comments
 */
export default function NewsComments({ articleId, initialComments = [] }: CommentsProps) {
    const [commentText, setCommentText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    const { isAuthenticated, user } = useAuth();
    const newsCommentService = useApiService();

    const changeCommentData = useCallback(
        (commentData: CommentData): Comment => ({
            id: commentData.id,
            author: commentData.username,
            date: new Date(commentData.createdAt).toLocaleDateString(),
            text: commentData.comment,
            likes: commentData.likes,
            avatar: commentData.avatarURL,
            replies: [],
        }),
        [],
    );

    const fetchComments = useCallback(async () => {
        try {
            setComments([]);
            const response = await newsCommentService.getComments(articleId);
            const transformedData = response.data?.map(changeCommentData);
            setComments(transformedData || initialComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments(initialComments);
        }
    }, [articleId, initialComments, changeCommentData]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleInputFocus = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { returnTo: window.location.pathname } });
            return;
        }
        setIsFocused(true);
    };

    const handleDismiss = () => {
        setIsFocused(false);
        setCommentText('');
    };

    const handleSubmit = async () => {
        if (!commentText.trim() || !isAuthenticated) return;

        setIsSubmitting(true);
        try {
            const commentData = {
                articleId,
                text: commentText,
            };

            const response = await newsCommentService.sendComment(commentData);

            if (response && response.data) {
                const newsComment = changeCommentData(response.data);
                setComments([newsComment, ...comments]);
                setCommentText('');
                setIsFocused(false);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = async (commentId: string | number) => {
        try {
            await newsCommentService.likeComment(articleId, commentId);

            setComments(
                comments.map((comment) => {
                    if (comment.id === commentId) {
                        return { ...comment, likes: comment.likes + 1 };
                    }
                    return comment;
                }),
            );
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const handleReply = (commentId: string | number) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { returnTo: window.location.pathname } });
            return;
        }

        if (textareaRef.current) {
            const comment = comments.find((c) => c.id === commentId);
            if (comment) {
                setCommentText(`@${comment.author.split(' ')[0]} `);
                textareaRef.current.focus();
                setIsFocused(true);
            }
        }
    };

    const totalComments = comments.reduce((total, comment) => {
        return total + 1 + (comment.replies?.length || 0);
    }, 0);

    return (
        <CommentsContainer>
            <CommentsHeader>Top comments ({totalComments})</CommentsHeader>
            <CommentInput>
                <CommentAvatar>
                    {isAuthenticated && user?.data?.imageUrl ? (
                        <img src={user.data.imageUrl} alt="Your avatar" />
                    ) : (
                        <img src="/api/placeholder/40/40" alt="Default avatar" />
                    )}
                </CommentAvatar>
                <div
                    style={{
                        flex: 1,
                        minWidth: 0,
                        width: '100%',
                    }}
                >
                    <CommentTextArea
                        ref={textareaRef}
                        placeholder="Add to the discussion"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onFocus={handleInputFocus}
                    />

                    {isFocused && (
                        <ButtonContainer>
                            <Button
                                variant="text"
                                size="mini"
                                onClick={handleDismiss}
                                style={{
                                    borderRadius: '20px',
                                }}
                            >
                                Dismiss
                            </Button>
                            <Button
                                variant="light"
                                size="mini"
                                onClick={handleSubmit}
                                disabled={!commentText.trim() || isSubmitting}
                                style={{
                                    borderRadius: '20px',
                                }}
                            >
                                Submit
                            </Button>
                        </ButtonContainer>
                    )}
                </div>
            </CommentInput>

            <CommentList>
                {comments.map((comment) => (
                    <CommentCard key={comment.id}>
                        <CommentItem>
                            <CommentAvatar>
                                {comment.avatar ? (
                                    <img src={comment.avatar} alt={`${comment.author}'s avatar`} />
                                ) : (
                                    <PersonStanding
                                        style={{ padding: '4px' }}
                                        size={30}
                                        color={themeColors.colors.neutral.white}
                                    />
                                )}
                            </CommentAvatar>
                            <CommentContent>
                                <CommentAuthor>
                                    <AuthorName>{comment.author}</AuthorName>
                                    <CommentDate>{comment.date}</CommentDate>
                                </CommentAuthor>
                                <CommentText>{comment.text}</CommentText>
                                <CommentActions>
                                    <CommentAction onClick={() => handleLike(comment.id)}>
                                        <ThumbsUp size={16} />
                                        <span>{comment.likes}</span>
                                    </CommentAction>
                                    <CommentAction onClick={() => handleReply(comment.id)}>Reply</CommentAction>
                                </CommentActions>

                                {comment.replies && comment.replies.length > 0 && (
                                    <CommentReplies>
                                        {comment.replies.map((reply) => (
                                            <CommentReply key={reply.id}>
                                                <CommentAvatar>
                                                    {reply.avatar ? (
                                                        <img src={reply.avatar} alt={`${reply.author}'s avatar`} />
                                                    ) : (
                                                        <img src="/api/placeholder/40/40" alt="Default avatar" />
                                                    )}
                                                </CommentAvatar>
                                                <CommentContent>
                                                    <CommentAuthor>
                                                        <AuthorName>{reply.author}</AuthorName>
                                                        <CommentDate>{reply.date}</CommentDate>
                                                    </CommentAuthor>
                                                    <CommentText>{reply.text}</CommentText>
                                                    <CommentActions>
                                                        <CommentAction onClick={() => handleLike(reply.id)}>
                                                            <ThumbsUp size={16} />
                                                            <span>{reply.likes}</span>
                                                        </CommentAction>
                                                        <CommentAction onClick={() => handleReply(comment.id)}>
                                                            Reply
                                                        </CommentAction>
                                                    </CommentActions>
                                                </CommentContent>
                                            </CommentReply>
                                        ))}
                                    </CommentReplies>
                                )}
                            </CommentContent>
                        </CommentItem>
                    </CommentCard>
                ))}
            </CommentList>
        </CommentsContainer>
    );
}
