import { ApolloClient, InMemoryCache } from "@apollo/client";
import WEB_URL from "../web_url";

export const client = new ApolloClient({
    uri : `${WEB_URL}/api`,
    cache : new InMemoryCache
})