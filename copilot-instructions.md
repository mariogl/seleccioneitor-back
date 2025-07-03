Coding conventions for this project:

- One component per folder: each component folder will have the component file, the CSS file (only if necessary) and the test file (only if necessary)
- CSS imports go last
- No abbreviations in names (use `buttonElement`, not `btnEl`)
- Prefer one individual anonymous export when the file has the name of what it is exporting (i.e. a component file), and individual and named exports when the file is for exporting many things (although at the moment it has one) (i.e., types.ts)
- Never use tailwind if I don't ask for it
- Always write semantic HTML and keep in mind the accessibility
- The CSS resets and the global styles should be in src/styles/styles.css
- Don't ever use `any` type
- Don't import React from 'react'
- Don't write comments, except for cases where I should add/change something to your generated code
- use BEM for class names
- don't use REM for vertical spacing, use pixels instead
- CSS code is important for me, use element selectors just for global styles or resetting, in the other cases use class selectors
- Don't use oneliners when using if statements, always use curly braces
- Don't write or leave empty files
- Write code in small increments, so I can review it easily. I want short feedback loops.

Copilot and any AI assistants should follow these rules when generating code.
