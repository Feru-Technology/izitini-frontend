interface TabItem {
  id: number
  title: string
  content: string
}
export const tabItems: TabItem[] = [
  {
    id: 1,
    title: "Description",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
       standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
       It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
       It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
       and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    id: 2,
    title: "Technical & specification",
    content: "step 2 content",
  },

  {
    id: 3,
    title: "Review",
    content: "step 3 content",
  },
  {
    id: 4,
    title: "Shipping & Return",
    content: "Shipping & Return content",
  },
]
