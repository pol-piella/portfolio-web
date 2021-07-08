import styled from "styled-components";
import Link from "next/link";

const Tag = styled.div`
    padding: 0 5px;
    border-radius: 4px;
    text-align: center;
    background: ${(props) => props.color};
    color: white;
`;

const ContentTagLink = styled.a`
    color: white;
    cursor: pointer;
`

const ContentTag = ({ title, color, slug }) => (
    <Tag color={color}>
        <Link href={`/category/${slug}`}>
            <ContentTagLink>{title}</ContentTagLink>
        </Link>
    </Tag>
);

export default ContentTag;
