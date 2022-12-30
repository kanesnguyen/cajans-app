import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

export const DEFAULT_PRODUCTS_COUNT = 5;
const REMOVE_PRODUCTS_MUTATION = `
    mutation productDelete($input: ProductDeleteInput!) {
    productDelete(input: $input) {
      deletedProductId
    }
  } 
`;

export default async function productRemove(
  session,
  count = DEFAULT_PRODUCTS_COUNT
) {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    for (let i = 0; i < count; i++) {
      await client.query({
        data: {
          query: REMOVE_PRODUCTS_MUTATION,
          variables: {
            input: {
              id: 'gid://shopify/Product/8063563497780'
            },
          },
        },
      });
    }
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}