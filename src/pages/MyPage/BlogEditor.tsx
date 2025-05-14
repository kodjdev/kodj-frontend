import React, { useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import {
    FaImage,
    FaHeading,
    FaBold,
    FaItalic,
    FaListUl,
    FaListOl,
    FaQuoteRight,
    FaCode,
    FaLink,
    FaSave,
} from 'react-icons/fa';

type BlogPost = {
    id?: string;
    title: string;
    content: string;
    coverImage?: string;
    published: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.lg};
`;

const EmptyState = styled.div`
    text-align: center;
    padding: ${themeColors.spacing.fourXl} 0;
    color: ${themeColors.colors.gray.text};
`;

const EmptyStateTitle = styled.h3`
    font-size: ${themeColors.typography.body.large.fontSize}px;
    margin-bottom: ${themeColors.spacing.md};
    color: ${themeColors.colors.neutral.white};
`;

const EmptyStateText = styled.p`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    margin-bottom: ${themeColors.spacing.lg};
`;

const TitleInput = styled.input`
    background-color: ${themeColors.colors.gray.inputTag};
    color: ${themeColors.colors.neutral.white};
    border: none;
    padding: ${themeColors.spacing.md};
    border-radius: ${themeColors.cardBorder.md};
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    width: 100%;
    box-shadow: ${themeColors.shadows.inset.input.gray};
    margin-bottom: ${themeColors.spacing.md};

    &:focus {
        outline: none;
        box-shadow: ${themeColors.shadows.inset.input.purple};
    }

    &::placeholder {
        color: ${themeColors.colors.gray.text};
    }
`;

const Toolbar = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${themeColors.spacing.sm};
    padding: ${themeColors.spacing.sm};
    background-color: ${themeColors.colors.gray.inputTag};
    border-radius: ${themeColors.cardBorder.md} ${themeColors.cardBorder.md} 0 0;
`;

const ToolbarButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: transparent;
    border: none;
    color: ${themeColors.colors.neutral.white};
    border-radius: ${themeColors.cardBorder.sm};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${themeColors.colors.gray.hover};
    }
`;

const EditorTextarea = styled.textarea`
    background-color: ${themeColors.colors.gray.inputTag};
    color: ${themeColors.colors.neutral.white};
    border: none;
    border-radius: 0 0 ${themeColors.cardBorder.md} ${themeColors.cardBorder.md};
    padding: ${themeColors.spacing.md};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    min-height: 300px;
    width: 100%;
    resize: vertical;
    box-shadow: ${themeColors.shadows.inset.input.gray};

    &:focus {
        outline: none;
        box-shadow: ${themeColors.shadows.inset.input.purple};
    }
`;

const UploadCoverButton = styled.button`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.sm};
    background-color: ${themeColors.colors.gray.background};
    color: ${themeColors.colors.neutral.white};
    border: 1px dashed ${themeColors.colors.gray.text};
    border-radius: ${themeColors.cardBorder.md};
    padding: ${themeColors.spacing.md};
    width: 100%;
    cursor: pointer;
    transition: border-color 0.2s;
    margin-bottom: ${themeColors.spacing.md};

    &:hover {
        border-color: ${themeColors.colors.primary.main};
    }
`;

const CoverImagePreview = styled.div`
    position: relative;
    margin-bottom: ${themeColors.spacing.md};
`;

const CoverImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: ${themeColors.cardBorder.md};
`;

const RemoveCoverButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: ${themeColors.colors.utility.black_60};
    color: ${themeColors.colors.neutral.white};
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${themeColors.colors.status.error.button};
    }
`;

const ButtonsRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${themeColors.spacing.lg};
`;

const BlogStatusToggle = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md};
`;

const ToggleLabel = styled.label`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.sm};
    cursor: pointer;
    color: ${themeColors.colors.gray.text};
`;

const ToggleSwitch = styled.div<{ isActive: boolean }>`
    width: 40px;
    height: 20px;
    background-color: ${(props) => (props.isActive ? themeColors.colors.primary.main : themeColors.colors.gray.main)};
    border-radius: 10px;
    position: relative;
    transition: background-color 0.2s;

    &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: ${(props) => (props.isActive ? '22px' : '2px')};
        width: 16px;
        height: 16px;
        background-color: ${themeColors.colors.neutral.white};
        border-radius: 50%;
        transition: left 0.2s;
    }
`;

/**
 * BlogEditor Component - Sub Organism Component
 * Editor for creating and editing blog posts
 */
export default function BlogEditor() {
    const [hasPosts, setHasPosts] = useState(false);
    const [post, setPost] = useState<BlogPost>({
        title: '',
        content: '',
        published: false,
    });
    const [coverImage, setCoverImage] = useState<string | null>(null);

    const handleNewPost = () => {
        setHasPosts(true);
        setPost({
            title: '',
            content: '',
            published: false,
        });
        setCoverImage(null);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost((prev) => ({ ...prev, content: e.target.value }));
    };

    const togglePublished = () => {
        setPost((prev) => ({ ...prev, published: !prev.published }));
    };

    const handleCoverUpload = () => {
        // later i will add the blog posting api service
        // and implement it here
        setCoverImage('/api/placeholder/800/400');
    };

    const removeCoverImage = () => {
        setCoverImage(null);
    };

    const savePost = () => {
        console.log('Saving blog post:', { ...post, coverImage });
        alert('Blog post saved successfully!');
    };

    if (!hasPosts) {
        return (
            <EmptyState>
                <EmptyStateTitle>There are no blog posts written.</EmptyStateTitle>
                <EmptyStateText>Start sharing your thoughts with the KO'DJ community.</EmptyStateText>
                <Button variant="light" size="mini" onClick={handleNewPost}>
                    Write Blog
                </Button>
            </EmptyState>
        );
    }

    return (
        <EditorContainer>
            <TitleInput placeholder="Blog title" value={post.title} onChange={handleTitleChange} />

            {coverImage ? (
                <CoverImagePreview>
                    <CoverImage src={coverImage} alt="Cover" />
                    <RemoveCoverButton onClick={removeCoverImage}>✕</RemoveCoverButton>
                </CoverImagePreview>
            ) : (
                <UploadCoverButton onClick={handleCoverUpload}>
                    <FaImage />
                    <span>Upload cover image</span>
                </UploadCoverButton>
            )}

            <div>
                <Toolbar>
                    <ToolbarButton title="Heading">
                        <FaHeading />
                    </ToolbarButton>
                    <ToolbarButton title="Bold">
                        <FaBold />
                    </ToolbarButton>
                    <ToolbarButton title="Italic">
                        <FaItalic />
                    </ToolbarButton>
                    <ToolbarButton title="Bulleted List">
                        <FaListUl />
                    </ToolbarButton>
                    <ToolbarButton title="Numbered List">
                        <FaListOl />
                    </ToolbarButton>
                    <ToolbarButton title="Quote">
                        <FaQuoteRight />
                    </ToolbarButton>
                    <ToolbarButton title="Code">
                        <FaCode />
                    </ToolbarButton>
                    <ToolbarButton title="Link">
                        <FaLink />
                    </ToolbarButton>
                </Toolbar>

                <EditorTextarea
                    placeholder="Write your blog post here..."
                    value={post.content}
                    onChange={handleContentChange}
                />
            </div>

            <ButtonsRow>
                <BlogStatusToggle>
                    <ToggleLabel>
                        <input
                            type="checkbox"
                            checked={post.published}
                            onChange={togglePublished}
                            style={{ display: 'none' }}
                        />
                        <ToggleSwitch isActive={post.published} />
                        <span>{post.published ? 'Published' : 'Draft'}</span>
                    </ToggleLabel>
                </BlogStatusToggle>

                <Button variant="primary" size="md" onClick={savePost} disabled={!post.title || !post.content}>
                    <FaSave style={{ marginRight: '8px' }} />
                    Save Post
                </Button>
            </ButtonsRow>
        </EditorContainer>
    );
}
