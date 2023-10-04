FROM cypress/included:12.14.0
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV PORT 3000
EXPOSE $PORT
RUN npx cypress verify
ENTRYPOINT ["npm", "run", "test"]