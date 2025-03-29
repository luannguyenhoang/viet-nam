export const GET_GRAPHQL = `
query MyQuery {
  allGraphQL {
    nodes {
      graphqlItem {
        graphqlChild {
          a1 {
            image {
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
`;
export const GET_KHACHSAN = `
query MyQuery {
  allKhachSan {
    nodes {
      cardZoom {
        roomCardChild {
          cardContent {
            slug
            image {
              node {
                mediaItemUrl
              }
            }
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
