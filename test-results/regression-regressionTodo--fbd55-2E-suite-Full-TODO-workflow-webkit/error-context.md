# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "todos" [level=1] [ref=e5]
  - generic [ref=e6]:
    - textbox "What needs to be done?" [ref=e8]
    - list [ref=e9]:
      - listitem [ref=e10]:
        - generic [ref=e11]:
          - checkbox "Toggle Todo" [ref=e12] [cursor=pointer]
          - generic [ref=e13] [cursor=pointer]: Task 2
          - button "Delete" [ref=e14] [cursor=pointer]: ×
      - listitem [ref=e15]:
        - generic [ref=e16]:
          - checkbox "Toggle Todo" [ref=e17] [cursor=pointer]
          - generic [ref=e18] [cursor=pointer]: Task 3
          - button "Delete" [ref=e19] [cursor=pointer]: ×
    - generic [ref=e20]:
      - generic [ref=e21]: 2 items left
      - generic [ref=e22]:
        - button "All" [ref=e23]
        - button "Active" [ref=e24]
        - button "Completed" [ref=e25]
      - button "Clear completed" [ref=e26] [cursor=pointer]
```