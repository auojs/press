import matter from 'gray-matter';

export default function parseFrontmatter(content: string) {
  return matter(content);
}
