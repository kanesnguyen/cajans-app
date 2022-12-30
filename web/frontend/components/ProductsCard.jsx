import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Page,
  Layout,
  ResourceList,
  Thumbnail,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function ProductsCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();


  const {
      data,
      isLoading: isLoadingCount,
      isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/getAll",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });
  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  // const handlePopulate = async () => {
  //   setIsLoading(true);
  //   const response = await fetch("/api/products/create");

  //   if (response.ok) {
  //     await refetchProductCount();
  //     setToastProps({ content: "5 products created!" });
  //   } else {
  //     setIsLoading(false);
  //     setToastProps({
  //       content: "There was an error creating products",
  //       error: true,
  //     });
  //   }
  // };

  // const handleRemove = async () => {
  //   setIsLoading(true);
  //   const response = await fetch("/api/products/remove");

  //   if (response.ok) {
  //     await refetchProductCount();
  //     setToastProps({ content: "5 products remove!" });
  //   } else {
  //     setIsLoading(false);
  //     setToastProps({
  //       content: "There was an error remove products",
  //       error: true,
  //     });
  //   }
  // };
  
  return (
    <>
      {toastMarkup}
      <Page fullWidth>
      <Layout>
        <Layout.Section oneThird>
          <Card title="Product in Store" actions={[{content: 'Manage'}]}>
            <Card.Section>
              <TextStyle variant="bodyMd" color="subdued" as="span">
                {isLoadingCount ? 'Loading...' : data.length + ' products'}
              </TextStyle>
            </Card.Section>
            <Card.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={isLoadingCount ? [] : data}
                renderItem={(item) => {
                  const {id, title} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      accessibilityLabel={`View details for ${title}`}
                    >
                      <TextStyle variant="bodyMd" fontWeight="bold" as="h3">
                        {title}
                      </TextStyle>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
    </>
  );
}
