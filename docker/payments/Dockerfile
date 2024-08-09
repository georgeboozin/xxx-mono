FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack use pnpm@9.x
RUN pnpm install -g @nestjs/cli
ENV NODE_ENV=production

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm install --frozen-lockfile

RUN node_modules/.bin/nx build payments
RUN pnpm deploy --filter=payments --prod /prod/payments
RUN cp -R apps/payments/dist /prod/payments/dist

FROM base AS payments
COPY --from=build /prod/payments /prod/payments
WORKDIR /prod/payments
EXPOSE 8000
CMD [ "pnpm", "start" ]

