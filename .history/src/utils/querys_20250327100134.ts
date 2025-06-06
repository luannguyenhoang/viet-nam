export const GET_KHACHSAN = `
query MyQuery {
  allKhachSan {
    nodes {
      slug
      cardZoom {
        roomCardChild {
          cardContent {
            
            image {
              node {
                mediaItemUrl
              }
            }
            slug
            maxPrice
            minPrice
            zoomName
            time
            summaryOfContent
            m2
            people
            photos {
              child {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
export const GET_KHACHSAN_BY_ZOOMNAME = `
query MyQuery {
  allKhachSan {
    nodes {
      cardZoom {
        roomCardChild {
          cardContent {
          slug
            bathroom
            bed
            checkIn
            checkOut
            fieldGroupName
            hotelServices
            m2
            image {
              node {
                mediaItemUrl
              }
            }
            maxPrice
            minPrice
            people
            photos {
              child {
                node {
                  mediaItemUrl
                }
              }
            }
            roomAmenities
            summaryOfContent
            roomDirection
            time
            zoomName
          }
        }
      }
    }
  }
}
`;
export const GET_POSTS = `
query GetPosts($first: Int!, $after: String) {
  posts(first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        slug
        title
        excerpt
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      slug
      title
      excerpt
      featuredImage {
        node {
          mediaItemUrl
        }
      }
    }
  }
}
`;
