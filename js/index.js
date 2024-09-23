const query = `
  {
    products(first: 10) {
      edges {
        node {
          title
          description
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

fetch("https://tsodykteststore.myshopify.com/api/2023-01/graphql.json", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": "7e174585a317d187255660745da44cc7",
  },
  body: JSON.stringify({ query }),
})
  .then((response) => response.json())
  .then((data) => {
    const products = data.data.products.edges;
    const container = document.querySelector(".card-container");
    console.log(data);
    products.forEach(({ node: product }) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src =
        product.images.edges[0]?.node.url || "https://via.placeholder.com/150";
      img.alt = product.images.edges[0]?.node.altText || "Product Image";
      img.classList.add("product-img");

      const hoverImgSrc = product.images.edges[1]?.node.url || img.src;

      const title = document.createElement("h3");
      title.textContent = product.title;

      const description = document.createElement("p");
      description.textContent = "Lorem ipsum dolor sit amet";

      const price = document.createElement("p");
      const priceValue = product.variants.edges[0].node.price.amount;
      const currency = product.variants.edges[0].node.price.currencyCode;
      price.innerHTML = `Price: <strong>${priceValue} ${currency}</strong>`;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(price);

      card.addEventListener("mouseover", () => {
        img.src = hoverImgSrc;
      });
      card.addEventListener("mouseout", () => {
        img.src = product.images.edges[0]?.node.url || img.src;
      });

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

const faqData = [
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you will receive a tracking number by email. You can use this tracking number to track the progress of your shipment online.",
  },
  {
    question: "What is delivery time of my order?",
    answer:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit lectus cursus phasellus ridiculus nostra fames. Sollicitudin mi facilisi congue tellus dictumst eu ligula arcu. ",
  },
  {
    question: "How can I return my product?",
    answer:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit lectus cursus phasellus ridiculus nostra fames. Sollicitudin mi facilisi congue tellus dictumst eu ligula arcu. ",
  },
  {
    question: "What are the shipping costs my order?",
    answer:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit lectus cursus phasellus ridiculus nostra fames. Sollicitudin mi facilisi congue tellus dictumst eu ligula arcu. ",
  },
  {
    question: "Can I chance or cancel my order after pacing it?",
    answer:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit lectus cursus phasellus ridiculus nostra fames. Sollicitudin mi facilisi congue tellus dictumst eu ligula arcu. ",
  },
  {
    question: "What is delivery time of my order? ",
    answer:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit lectus cursus phasellus ridiculus nostra fames. Sollicitudin mi facilisi congue tellus dictumst eu ligula arcu. ",
  },
];
console.log(faqData);
const faqContainer = document.querySelector(".faq-container");

faqData.forEach((item) => {
  const faqCard = document.createElement("div");
  faqCard.classList.add("faqCard");

  const question = document.createElement("h3");
  question.textContent = item.question;

  const answer = document.createElement("p");
  answer.textContent = item.answer;

  faqCard.appendChild(question);
  faqCard.appendChild(answer);
  faqContainer.appendChild(faqCard);

  question.addEventListener("click", () => {
    const isActive = faqCard.classList.contains("active");

    document.querySelectorAll(".faqCard").forEach((card) => {
      card.classList.remove("active");
    });

    if (!isActive) {
      faqCard.classList.add("active");
    }
  });
});
