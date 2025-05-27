import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { env } from "./env";

export const apiClient = new ApolloClient({
  uri: env.productHunt.uri,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${env.productHunt.token}`,
  },
});

export const ClientProvider = ApolloProvider;

export const useClientQuery = useQuery;
