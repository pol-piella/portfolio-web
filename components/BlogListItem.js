import AuthorSection from "./AuthorSection";
import ContentTag from "./ContentTag";
import PostMetadata from "./PostMetadata";
import Link from "next/link";
import styled from "styled-components";

const BlogPostContainer = styled.div`
    line-height: unset;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 20px;
    background: ${({ theme }) => theme.code.background};
    border-radius: 15px;

    & > * {
        margin-bottom: 5px;
    }

    & h3 {
        font-weight: bolder;
        font-size: 23px;
    }
`;

const Tags = styled.div`
    display: flex;
    font-size: 11px;

    & > * {
        margin-right: 5px;
    }
`;

const BlogListItem = ({ post }) => (
    <BlogPostContainer>
        <Link href={`/${post.slug}`}>
            <a>
                <h3>{post.title.toUpperCase()}</h3>
            </a>
        </Link>
        <Tags>
            {post.tags.map((tag) => (
                <ContentTag
                    title={tag.name}
                    slug={tag.slug}
                    key={tag.name}
                />
            ))}
        </Tags>
        <p>{post.excerpt}</p>
        <PostMetadata post={post} />
    </BlogPostContainer>
);

export default BlogListItem;
