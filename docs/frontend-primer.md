# Frontend primer for a backend developer

Short mental models for the concepts that appear in this codebase. Agents must extend this file when they introduce a new concept.

| Frontend concept | Backend analogy | Plain explanation |
|---|---|---|
| **Component** | A function that returns a view | A function `(props) -> UI`. Re-runs whenever its inputs change. |
| **Props** | Method parameters | Read-only inputs a parent passes down. |
| **State** (`useState`) | A field that triggers re-render when it changes | Changing it asks React to run the component function again. |
| **Effect** (`useEffect`) | A lifecycle hook / `@PostConstruct` that can re-run | Code that talks to the outside world after rendering (fetch, subscribe). Has a dependency list. |
| **Context** (`AuthContext`) | A request-scoped / singleton bean | Shares a value (the token, login/logout) with every component below a provider without passing props. |
| **Custom hook** | A reusable service method that can hold state | A function named `useX` that bundles state + effects. |
| **Router / ProtectedRoute** | URL mapping + a security filter | Maps URLs to pages; the guard redirects to login when `isAuthenticated` is false. |
| **Apollo Client** | A cached HTTP client for GraphQL | Sends queries/mutations and keeps a **normalised cache** keyed by `__typename + id`. |
| **typePolicies merge** | A merge strategy for cache writes | Tells Apollo how to combine old and new lists (e.g. `Team.pokemons`) instead of replacing them. |
| **Apollo link chain** | Servlet filter chain / interceptors | `errorLink` -> `authLink` -> `httpLink`; each can read/modify the request or react to errors. |
| **graphql-codegen** | OpenAPI generator | Reads the Gateway schema and generates TypeScript types so a wrong field name fails at compile time. |
| **Zod schema** | Bean Validation (`@NotBlank`...) | Declares valid data once; gives both runtime validation and the TypeScript type. |
| **React Hook Form** | A form binder | Tracks inputs without re-rendering on each keystroke; `setError('root')` is a form-level error. |
| **Vite** | Build tool + dev server (Maven + embedded Tomcat with hot reload) | Serves modules instantly in dev, bundles for production. |
| **Bun** | JVM + Maven in one binary | JS/TS runtime and package manager. |
| **Tailwind** | Utility classes instead of writing CSS | `className="p-4 rounded-md"` composes styles directly. |
| **shadcn/ui** | A library you copy into your repo | Components live in `src/components/ui` as your own code (so do not hand-edit them; re-generate). |
| **localStorage JWT** | Storing a session id where scripts can read it | Simple but exposed to XSS; HTTP-only cookies are safer. This is a documented trade-off. |

## Questions worth asking an agent
- "Why does this component re-render?"  - "Where does this value come from (props, state, context, cache)?"
