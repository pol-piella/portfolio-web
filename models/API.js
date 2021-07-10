import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import _ from 'lodash';

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).map((file) => file.replace(/\.md$/, ''))
}

export function getTagForSlug(slug) {
    return getAllTags().filter((tag) => tag.slug === slug)[0];
}

export function getAllTags() {
    return _.uniqBy(getAllPosts(['tags']).map((post) => post.tags).flat(), (tag) => tag.slug)
}

export function getBlogPostsForTag(slug) {
    return getAllPosts().filter((post) => post.tags.some((tag) => tag.slug === slug));
}

export function getPostBySlug(slug, fields = [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'readtime',
    'tags',
    'content'
  ]) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields = [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'readtime',
    'tags'
  ]) {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}