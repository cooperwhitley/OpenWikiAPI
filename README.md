# OpenWiki API

## About

This is the back-end API that powers the <a href="https://github.com/cooperwhitley/OpenWikiApp">OpenWiki</a>. See below for relevant route tables.

## API

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

### Article

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/articles`             | `articles#index`    |
| DELETE | `/articles/<article_id>`        | `articles#delete`   |
| PATCH  | `/articles/<article_id>` | `articles#update`  |
| POST   | `/articles`             | `articles#create`    |
| GET  | `/articles/<article_id>` | `articles#show`  |

### Article Section

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| DELETE | `/sections/<article_id>/<section_id>`| `section#delete`   |
| PATCH  | `/sections/<article_id>/<section_id>` | `section#update`  |
| POST   | `/sections/<article_id>`             | `section#create`    |

### Article InfoBox Field

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| DELETE | `/articles/<article_id>/<infoBox_id>`| `infoBox#delete`   |
| PATCH  | `/infoboxes/<article_id>/<infoBox_id>` | `infoBox#update`  |
| POST   | `/infoboxes/<article_id>`     | `infoBox#create`    |