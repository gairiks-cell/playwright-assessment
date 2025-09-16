# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "todos" [level=1] [ref=e5]
  - generic [ref=e6]:
    - textbox "What needs to be done?" [active] [ref=e8]
    - list [ref=e9]:
      - listitem [ref=e10]:
        - generic [ref=e11]:
          - checkbox "Toggle Todo" [ref=e12] [cursor=pointer]
          - generic [ref=e13] [cursor=pointer]: Task 1
          - button "Delete" [ref=e14] [cursor=pointer]: ×
      - listitem [ref=e15]:
        - generic [ref=e16]:
          - checkbox "Toggle Todo" [ref=e17] [cursor=pointer]
          - generic [ref=e18] [cursor=pointer]: Task 2
          - button "Delete" [ref=e19] [cursor=pointer]: ×
      - listitem [ref=e20]:
        - generic [ref=e21]:
          - checkbox "Toggle Todo" [ref=e22] [cursor=pointer]
          - generic [ref=e23] [cursor=pointer]: Task 3
          - button "Delete" [ref=e24] [cursor=pointer]: ×
    - generic [ref=e25]:
      - generic [ref=e26]: 3 items left
      - generic [ref=e27]:
        - button "All" [ref=e28]
        - button "Active" [ref=e29]
        - button "Completed" [ref=e30]
      - button "Clear completed" [ref=e31] [cursor=pointer]
```