import { useState } from "react";

const NAV = [
  { id: "fp", label: "FP Concepts", icon: "⚗️" },
  { id: "basics", label: "Scheme Basics", icon: "🔧" },
  { id: "lists", label: "Lists & Pairs", icon: "📋" },
  { id: "functions", label: "Functions", icon: "λ" },
  { id: "control", label: "Control Flow", icon: "🔀" },
  { id: "hof", label: "Higher-Order", icon: "🚀" },
  { id: "recursion", label: "Recursion", icon: "♻️" },
  { id: "quiz", label: "Quiz", icon: "🧠" },
];

const COLORS = {
  fp: { bg: "#1a0533", accent: "#c084fc", glow: "#7c3aed", card: "#2d0a4e" },
  basics: { bg: "#0a1a2e", accent: "#38bdf8", glow: "#0284c7", card: "#0f2744" },
  lists: { bg: "#0a2e1a", accent: "#4ade80", glow: "#16a34a", card: "#0f3d20" },
  functions: { bg: "#2e1a0a", accent: "#fb923c", glow: "#ea580c", card: "#3d2310" },
  control: { bg: "#2e0a1a", accent: "#f472b6", glow: "#db2777", card: "#3d1028" },
  hof: { bg: "#0a2e2e", accent: "#2dd4bf", glow: "#0d9488", card: "#0f3d3d" },
  recursion: { bg: "#1a2e0a", accent: "#a3e635", glow: "#65a30d", card: "#243d10" },
  quiz: { bg: "#1a1a0a", accent: "#fbbf24", glow: "#d97706", card: "#2e2e10" },
};

function CodeBlock({ code, result }) {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(code).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ background: "#0d0d14", padding: "14px 16px", fontFamily: "monospace", fontSize: 13.5, lineHeight: 1.7, position: "relative", textAlign: "left" }}>
        <button onClick={copyCode} style={{ position: "absolute", top: 8, right: 10, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 5, color: "#aaa", fontSize: 11, padding: "3px 8px", cursor: "pointer" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", textAlign: "left" }}>
          {tokenize(code)}
        </pre>
      </div>
      {result && (
        <div style={{ background: "#13130d", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 16px", fontFamily: "monospace", fontSize: 13, color: "#a3e635" }}>
          <span style={{ color: "#555", marginRight: 8 }}>⇒</span>{result}
        </div>
      )}
    </div>
  );
}

function tokenize(code) {
  const parts = [];
  const re = /("(?:[^"\\]|\\.)*"|;[^\n]*|[()'\s]|[^\s()';]+)/g;
  let m;
  const keywords = new Set(["define", "lambda", "if", "cond", "let", "let*", "begin", "and", "or", "not", "quote", "else", "map", "filter", "fold", "apply", "display", "newline", "cons", "car", "cdr", "null?", "list", "length", "append", "reverse", "cadr", "caddr", "pair?", "number?", "equal?", "zero?", "positive?", "negative?"]);
  while ((m = re.exec(code)) !== null) {
    const t = m[1];
    if (t.startsWith(";")) parts.push(<span key={parts.length} style={{ color: "#6b7280" }}>{t}</span>);
    else if (t.startsWith('"')) parts.push(<span key={parts.length} style={{ color: "#fde68a" }}>{t}</span>);
    else if (t === "(" || t === ")") parts.push(<span key={parts.length} style={{ color: "#94a3b8" }}>{t}</span>);
    else if (t === "'") parts.push(<span key={parts.length} style={{ color: "#f472b6" }}>{t}</span>);
    else if (/^-?\d+(\.\d+)?$/.test(t)) parts.push(<span key={parts.length} style={{ color: "#60a5fa" }}>{t}</span>);
    else if (t === "#t" || t === "#f") parts.push(<span key={parts.length} style={{ color: "#c084fc" }}>{t}</span>);
    else if (keywords.has(t)) parts.push(<span key={parts.length} style={{ color: "#f472b6", fontWeight: 600 }}>{t}</span>);
    else if (/^[+\-*/=<>!?]/.test(t) || t === "=>") parts.push(<span key={parts.length} style={{ color: "#fb923c" }}>{t}</span>);
    else if (t.trim() === "") parts.push(t);
    else parts.push(<span key={parts.length} style={{ color: "#e2e8f0" }}>{t}</span>);
  }
  return parts;
}

function Card({ title, children, accent }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}33`, borderRadius: 12, padding: "18px 20px", marginBottom: 16, textAlign: "left" }}>
      {title && <h3 style={{ color: accent, margin: "0 0 12px", fontSize: 15, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{title}</h3>}
      {children}
    </div>
  );
}

function Badge({ children, color }) {
  return (
    <span style={{ background: `${color}22`, border: `1px solid ${color}55`, color: color, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600, marginRight: 6 }}>
      {children}
    </span>
  );
}

function P({ children }) {
  return <p style={{ color: "#cbd5e1", lineHeight: 1.75, margin: "0 0 12px", fontSize: 14, textAlign: "left" }}>{children}</p>;
}

function H2({ children, accent }) {
  return <h2 style={{ color: accent, fontSize: 22, fontWeight: 800, margin: "0 0 20px", letterSpacing: -0.5 }}>{children}</h2>;
}

// ────── SECTIONS ──────

function FPConcepts({ c }) {
  return (
    <div>
      <H2 accent={c.accent}>Functional Programming Concepts</H2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { t: "Pure Functions", d: "Always return the same output for the same input. No hidden state, no surprises.", icon: "✨" },
          { t: "Immutability", d: "Data never changes in place. New values are computed and returned instead.", icon: "🔒" },
          { t: "No Side Effects", d: "Functions don't modify external state, print, or do I/O as a byproduct.", icon: "🚫" },
          { t: "Referential Transparency", d: "An expression can be replaced by its value without changing program behavior.", icon: "🔁" },
          { t: "First-Class Functions", d: "Functions are values — pass them as args, return them, store them.", icon: "🎁" },
          { t: "Recursion over Iteration", d: "FP prefers recursive definitions instead of loops with mutable counters.", icon: "♾️" },
        ].map(({ t, d, icon }) => (
          <div key={t} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${c.accent}33`, borderRadius: 10, padding: 16, textAlign: "left" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
            <div style={{ color: c.accent, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{t}</div>
            <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6 }}>{d}</div>
          </div>
        ))}
      </div>

      <Card title="Side Effects — what to avoid" accent={c.accent}>
        <P>A side effect is anything a function does beyond computing a return value — modifying global state, printing to screen, reading from disk, etc.</P>
        <CodeBlock code={`; BAD (imperative) — modifies external state
int x = 0;
void myFunc() {
  if(x == 0) printf("zero\\n"); ; side-effect!
}

; GOOD (functional) — pure computation
(define (double x) (* x 2))   ; always same result`} />
      </Card>

      <Card title="Referential Transparency" accent={c.accent}>
        <P>If a function has no side effects, calling <code style={{ color: c.accent, background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4 }}>fun(a)</code> twice always gives the same result, so we can safely replace either call with a cached value.</P>
        <CodeBlock code={`result1 = (fun(a) + b) / (fun(a) - c)
temp    = fun(a)
result2 = (temp + b)  / (temp - c)
; result1 == result2  ← guaranteed if fun is pure`} />
      </Card>

      <Card title="Functional Language Advantages" accent={c.accent}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Modularity", "Concurrency-friendly", "Simplicity", "Easier testing", "Predictable", "Composable"].map(a => (
            <Badge key={a} color={c.accent}>{a}</Badge>
          ))}
        </div>
        <P style={{ marginTop: 10 }}>Functional programs avoid shared mutable state, making concurrency safe and programs easier to reason about and test.</P>
      </Card>
    </div>
  );
}

function SchemeBasics({ c }) {
  return (
    <div>
      <H2 accent={c.accent}>Scheme Basics</H2>
      <Card title="What is Scheme?" accent={c.accent}>
        <P>Scheme is a dialect of Lisp — a minimal, elegant functional language. Everything is an <em>S-expression</em> (symbolic expression). Scheme is based on mathematical functions: no state, parameters map to values.</P>
        <CodeBlock code={`; Syntax: (operator arg1 arg2 ...)
; Prefix notation — operator comes first
(+ 1 2)       ; → 3
(* 3 4)       ; → 12
(+ 1 2 3 4)   ; → 10  (variadic)
(/ 10 2)      ; → 5`} result="prefix notation for everything" />
      </Card>

      <Card title="define — create bindings" accent={c.accent}>
        <CodeBlock code={`; Define a variable
(define x 42)
(define pi 3.14159)
(define greeting "Hello, World!")

; Define a function
(define (square x)
  (* x x))

(square 5)    ; → 25
(square 9)    ; → 81`} />
      </Card>

      <Card title="Basic Arithmetic & Comparisons" accent={c.accent}>
        <CodeBlock code={`(+ 3 4)       ; → 7    addition
(- 10 3)      ; → 7    subtraction
(* 6 7)       ; → 42   multiplication
(/ 15 3)      ; → 5    division
(modulo 10 3) ; → 1    remainder
(expt 2 8)    ; → 256  power

(= 3 3)       ; → #t   equal
(< 2 5)       ; → #t   less than
(> 10 3)      ; → #t   greater than
(<= 4 4)      ; → #t   less or equal
(>= 5 3)      ; → #t   greater or equal`} />
      </Card>

      <Card title="Boolean Values" accent={c.accent}>
        <CodeBlock code={`#t          ; true
#f          ; false

(and #t #f) ; → #f
(or #f #t)  ; → #t
(not #t)    ; → #f

; Everything except #f is truthy!
(if 0 "yes" "no")   ; → "yes"  (0 is truthy in Scheme!)
(if "" "yes" "no")  ; → "yes"  ("" is truthy too)`} />
      </Card>

      <Card title="Quoting — ' prevents evaluation" accent={c.accent}>
        <P>Prefix a symbol or list with <code style={{ color: c.accent, background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4 }}>'</code> to treat it as data, not code.</P>
        <CodeBlock code={`'hello         ; → hello  (a symbol, not evaluated)
'(1 2 3)       ; → (1 2 3)  (a list literal)
(quote (a b))  ; → (a b)   same as '(a b)

; Without quote:
(define x 5)
x              ; → 5   (evaluates the variable)

; With quote:
'x             ; → x   (the symbol x itself)`} />
      </Card>

      <Card title="display & newline" accent={c.accent}>
        <CodeBlock code={`(display "Hello, World!")
(newline)
(display (* 6 7))
; Outputs:
; Hello, World!
; 42`} />
      </Card>
    </div>
  );
}

function ListsAndPairs({ c }) {
  return (
    <div>
      <H2 accent={c.accent}>Lists & Pairs</H2>
      <Card title="What is a List?" accent={c.accent}>
        <P>In Scheme, a list is a <strong style={{ color: c.accent }}>linked sequence of pairs</strong> ending in the empty list <code style={{ color: c.accent, background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4 }}>'()</code>. Internally: each pair holds a value and a pointer to the next pair.</P>
        <CodeBlock code={`(define numbers '(1 2 3 4))
; Internally: (1 . (2 . (3 . (4 . ()))))

'()            ; empty list
'(a b c)       ; list of symbols
'(1 "two" #t)  ; mixed types allowed`} />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { fn: "cons", desc: "Attach head to tail (construct a pair)", code: `(cons 1 '(2 3 4))  ; → (1 2 3 4)\n(cons 1 '())       ; → (1)\n(cons 'a '(b c))   ; → (a b c)` },
          { fn: "car", desc: "Get the FIRST element", code: `(car '(10 20 30))  ; → 10\n(car '(a b c))     ; → a\n(car '((1 2) 3))   ; → (1 2)` },
          { fn: "cdr", desc: "Get the REST (all but first)", code: `(cdr '(10 20 30))  ; → (20 30)\n(cdr '(a b c))     ; → (b c)\n(cdr '(x))         ; → ()` },
          { fn: "null?", desc: "Check if list is empty (stops recursion)", code: `(null? '())        ; → #t\n(null? '(1 2 3))   ; → #f\n(null? (cdr '(x))) ; → #t` },
          { fn: "list", desc: "Construct a new list from elements", code: `(list 1 2 3 4)     ; → (1 2 3 4)\n(list 'a 'b 'c)    ; → (a b c)\n(list)             ; → ()` },
          { fn: "length", desc: "Count the number of elements", code: `(length '(a b c d)); → 4\n(length '())       ; → 0\n(length '(1 2 3))  ; → 3` },
          { fn: "append", desc: "Join two or more lists together", code: `(append '(1 2) '(3 4))  ; → (1 2 3 4)\n(append '(a) '(b) '(c)) ; → (a b c)` },
          { fn: "reverse", desc: "Reverse a list", code: `(reverse '(a b c))       ; → (c b a)\n(reverse '(1 2 3 4 5))   ; → (5 4 3 2 1)` },
        ].map(({ fn, desc, code }) => (
          <div key={fn} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${c.accent}33`, borderRadius: 10, padding: 14, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <code style={{ color: c.accent, fontSize: 15, fontWeight: 700, fontFamily: "monospace" }}>{fn}</code>
            </div>
            <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{desc}</div>
            <pre style={{ margin: 0, fontFamily: "monospace", fontSize: 12, color: "#e2e8f0", background: "#0d0d14", padding: "10px 12px", borderRadius: 7, whiteSpace: "pre-wrap", textAlign: "left" }}>
              {tokenize(code)}
            </pre>
          </div>
        ))}
      </div>

      <Card title="Nesting: cadr, caddr, etc." accent={c.accent}>
        <P>Scheme provides shortcuts for common car/cdr combinations:</P>
        <CodeBlock code={`(define lst '(10 20 30 40))

(car lst)           ; → 10    (first)
(cadr lst)          ; → 20    (second)  = (car (cdr lst))
(caddr lst)         ; → 30    (third)   = (car (cdr (cdr lst)))
(cadddr lst)        ; → 40    (fourth)

(car '((1 2) (3 4))); → (1 2)  (nested lists)`} />
      </Card>
    </div>
  );
}

function FunctionsSection({ c }) {
  return (
    <div>
      <H2 accent={c.accent}>Functions & Lambda</H2>
      <Card title="define — named functions" accent={c.accent}>
        <CodeBlock code={`; (define (name param1 param2 ...) body)
(define (greet name)
  (display "Hello, ")
  (display name)
  (newline))

(greet "Alice")   ; Hello, Alice

; Multiple parameters
(define (add-then-square a b)
  (* (+ a b) (+ a b)))

(add-then-square 3 4)  ; → 49`} />
      </Card>

      <Card title="lambda — anonymous functions" accent={c.accent}>
        <P>A lambda is an unnamed function value. Useful for passing functions as arguments.</P>
        <CodeBlock code={`; (lambda (params) body)
(lambda (x) (* x x))       ; a function, not yet named

; Assign to a name
(define square
  (lambda (x) (* x x)))
(square 6)    ; → 36

; These two are equivalent:
(define (cube x) (* x x x))
(define cube (lambda (x) (* x x x)))

; Immediately invoked
((lambda (x y) (+ x y)) 10 20)  ; → 30`} />
      </Card>

      <Card title="let — local bindings" accent={c.accent}>
        <P>Use <code style={{ color: c.accent, background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4 }}>let</code> to create local variables. All bindings are evaluated simultaneously (old scope).</P>
        <CodeBlock code={`; (let ((var val) ...) body)
(let ((x 5)
      (y 10))
  (+ x y))       ; → 15  (x and y only exist here)

; Useful to avoid repeated computation:
(let ((a (expensive-computation 42)))
  (+ a a))       ; compute once, use twice

; let* — sequential (each can use prev)
(let* ((x 2)
       (y (* x 3)))   ; y can reference x
  (+ x y))       ; → 8`} />
      </Card>

      <Card title="begin — sequence expressions" accent={c.accent}>
        <CodeBlock code={`(begin
  (display "Step 1")
  (newline)
  (display "Step 2")
  (newline)
  42)          ; the last value is returned → 42`} />
      </Card>
    </div>
  );
}

function ControlFlow({ c }) {
  return (
    <div>
      <H2 accent={c.accent}>Control Flow</H2>
      <Card title="if — conditional expression" accent={c.accent}>
        <P><code style={{ color: c.accent, background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4 }}>if</code> takes a test, a then-branch, and an optional else-branch. The whole thing is an <em>expression</em> that returns a value.</P>
        <CodeBlock code={`; (if test then else)
(if #t "yes" "no")            ; → "yes"
(if #f "yes" "no")            ; → "no"
(if (> 5 3) "big" "small")    ; → "big"

; In functions:
(define (abs x)
  (if (< x 0)
      (- x)      ; then: negate
      x))        ; else: keep

(abs -7)   ; → 7
(abs  3)   ; → 3`} />
      </Card>

      <Card title="cond — multi-branch conditional" accent={c.accent}>
        <P><code style={{ color: c.accent, background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4 }}>cond</code> is like a chain of if-elseif-else. The <code style={{ color: c.accent }}>else</code> clause catches everything.</P>
        <CodeBlock code={`; (cond (test1 expr1) (test2 expr2) (else default))
(define (grade score)
  (cond ((>= score 90) "A")
        ((>= score 80) "B")
        ((>= score 70) "C")
        ((>= score 60) "D")
        (else          "F")))

(grade 85)   ; → "B"
(grade 55)   ; → "F"

; Classify a number
(define (classify n)
  (cond ((positive? n) "positive")
        ((negative? n) "negative")
        (else          "zero")))

(classify  5)  ; → "positive"
(classify -3)  ; → "negative"
(classify  0)  ; → "zero"`} />
      </Card>

      <Card title="and / or — short-circuit logic" accent={c.accent}>
        <CodeBlock code={`(and #t #t #f)    ; → #f   (all must be true)
(or  #f #f #t)    ; → #t   (at least one true)
(and)             ; → #t   (vacuously true)
(or)              ; → #f   (vacuously false)

; Short-circuit: stops at first false/true
(and (> 5 3) (< 2 1))   ; → #f  (stops after (< 2 1))
(or  (> 5 3) (error!))  ; → #t  (never evaluates error!)`} />
      </Card>

      <Card title="when / unless" accent={c.accent}>
        <CodeBlock code={`; when: if without else (for side effects)
(when (> x 0)
  (display "Positive!")
  (newline))

; unless: runs when condition is FALSE
(unless (null? lst)
  (display (car lst)))`} />
      </Card>
    </div>
  );
}

function HigherOrder({ c }) {
  return (
    <div>
      <H2 accent={c.accent}>Higher-Order Functions</H2>
      <P>Functions that take other functions as arguments or return functions as results. The heart of functional programming.</P>

      <Card title="map — transform every element" accent={c.accent}>
        <CodeBlock code={`; (map function list)
; Applies function to EACH element, returns new list
(map (lambda (x) (* x 2)) '(1 2 3 4))
; → (2 4 6 8)

(map (lambda (x) (* x x)) '(1 2 3 4 5))
; → (1 4 9 16 25)

; Using a named function
(define (double x) (* x 2))
(map double '(5 10 15))
; → (10 20 30)

; Two lists at once
(map + '(1 2 3) '(10 20 30))
; → (11 22 33)`} />
      </Card>

      <Card title="filter — keep elements that pass a test" accent={c.accent}>
        <CodeBlock code={`; (filter predicate list)
; Keeps only elements for which predicate returns #t
(filter odd? '(1 2 3 4 5 6))
; → (1 3 5)

(filter even? '(1 2 3 4 5 6))
; → (2 4 6)

(filter (lambda (x) (> x 3)) '(1 2 3 4 5))
; → (4 5)

(filter positive? '(-3 -1 0 2 5))
; → (2 5)`} />
      </Card>

      <Card title="fold / reduce — accumulate a result" accent={c.accent}>
        <CodeBlock code={`; fold-right: (fold-right f init list)
; Applies f cumulatively from right
(fold-right + 0 '(1 2 3 4))   ; → 10
(fold-right * 1 '(1 2 3 4 5)) ; → 120

; fold-left (accumulates from left)
(fold-left + 0 '(1 2 3 4))    ; → 10
(fold-left (lambda (acc x) (cons x acc))
           '() '(1 2 3))
; → (3 2 1)  (reverses the list!)`} />
      </Card>

      <Card title="apply — call function with a list of args" accent={c.accent}>
        <CodeBlock code={`; (apply function list)
(apply + '(1 2 3 4))    ; → 10  same as (+ 1 2 3 4)
(apply max '(3 1 4 1 5)); → 5
(apply string-append '("Hello" ", " "World!"))
; → "Hello, World!"`} />
      </Card>

      <Card title="Composing functions" accent={c.accent}>
        <CodeBlock code={`; Functions returning functions (closures)
(define (make-adder n)
  (lambda (x) (+ x n)))

(define add5  (make-adder 5))
(define add10 (make-adder 10))

(add5 3)   ; → 8
(add10 7)  ; → 17

; Compose: apply map then filter
(filter odd? (map (lambda (x) (* x x)) '(1 2 3 4 5)))
; → (1 9 25)   squares that are odd`} />
      </Card>
    </div>
  );
}

function Recursion({ c }) {
  return (
    <div>
      <H2 accent={c.accent}>Recursion</H2>
      <P>Scheme uses recursion instead of loops. The pattern is always: base case + recursive step.</P>

      <Card title="The Recursion Template" accent={c.accent}>
        <CodeBlock code={`(define (function lst)
  (if (null? lst)
      BASE-CASE          ; stop condition
      (... (car lst)     ; process first element
           (function (cdr lst)))))  ; recurse on rest`} />
      </Card>

      <Card title="Classic Examples" accent={c.accent}>
        <CodeBlock code={`; Sum all elements
(define (sum-list lst)
  (if (null? lst)
      0
      (+ (car lst) (sum-list (cdr lst)))))

(sum-list '(1 2 3 4))  ; → 10

; Count elements (my-length)
(define (list-length lst)
  (if (null? lst)
      0
      (+ 1 (list-length (cdr lst)))))

(list-length '(10 20 30 40))  ; → 4

; Factorial
(define (factorial n)
  (if (= n 0)
      1
      (* n (factorial (- n 1)))))

(factorial 5)   ; → 120
(factorial 10)  ; → 3628800

; Fibonacci
(define (fib n)
  (cond ((= n 0) 0)
        ((= n 1) 1)
        (else (+ (fib (- n 1))
                 (fib (- n 2))))))

(fib 10)  ; → 55`} />
      </Card>

      <Card title="Building lists with recursion" accent={c.accent}>
        <CodeBlock code={`; my-map (reimplementing map)
(define (my-map f lst)
  (if (null? lst)
      '()
      (cons (f (car lst))
            (my-map f (cdr lst)))))

(my-map (lambda (x) (* x 3)) '(1 2 3 4))
; → (3 6 9 12)

; my-filter (reimplementing filter)
(define (my-filter pred lst)
  (cond ((null? lst) '())
        ((pred (car lst))
         (cons (car lst) (my-filter pred (cdr lst))))
        (else (my-filter pred (cdr lst)))))

(my-filter even? '(1 2 3 4 5 6))
; → (2 4 6)`} />
      </Card>

      <Card title="Tail Recursion — optimization" accent={c.accent}>
        <P>A tail-recursive function makes its recursive call as the <em>last</em> action, allowing Scheme to optimize it to a loop (no stack growth).</P>
        <CodeBlock code={`; Normal recursion (builds stack):
(define (sum-list lst)
  (if (null? lst) 0
      (+ (car lst) (sum-list (cdr lst))))) ; + waits!

; Tail-recursive (no pending work):
(define (sum-tail lst acc)
  (if (null? lst)
      acc
      (sum-tail (cdr lst) (+ acc (car lst))))) ; nothing waits

(sum-tail '(1 2 3 4 5) 0)   ; → 15`} />
      </Card>
    </div>
  );
}

const QUIZ_QUESTIONS = [
  { q: "What does (car '(10 20 30)) return?", opts: ["(10)", "10", "(20 30)", "#t"], answer: 1 },
  { q: "What does (cdr '(a b c)) return?", opts: ["a", "(b c)", "(a)", "c"], answer: 1 },
  { q: "What does (cons 1 '(2 3)) return?", opts: ["(2 3 1)", "(1)", "(1 2 3)", "1"], answer: 2 },
  { q: "What does (null? '()) return?", opts: ["#f", "0", "#t", "()"], answer: 2 },
  { q: "What is the base case for list recursion?", opts: ["(= n 0)", "(null? lst)", "(car lst)", "(cdr lst)"], answer: 1 },
  { q: "What does (map (lambda (x) (* x x)) '(1 2 3)) return?", opts: ["(1 2 3)", "(2 4 6)", "(1 4 9)", "6"], answer: 2 },
  { q: "In Scheme, what is a side effect?", opts: ["Returning a value", "Modifying external state", "Using recursion", "Defining a function"], answer: 1 },
  { q: "What does referential transparency mean?", opts: ["Code is transparent in color", "A function call can be replaced by its value", "Variables are visible everywhere", "Functions have no parameters"], answer: 1 },
  { q: "What does (length '(a b c d)) return?", opts: ["3", "0", "4", "(a b c d)"], answer: 2 },
  { q: "Which of these defines an anonymous function?", opts: ["define", "let", "lambda", "cond"], answer: 2 },
];

function Quiz({ c }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  const select = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 >= QUIZ_QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent(c2 => c2 + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const restart = () => {
    setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswered(false);
  };

  if (finished) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "📚" : "🔄"}</div>
        <div style={{ color: c.accent, fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{score}/{QUIZ_QUESTIONS.length}</div>
        <div style={{ color: "#cbd5e1", fontSize: 16, marginBottom: 24 }}>
          {pct >= 80 ? "Excellent! You've mastered Scheme fundamentals." : pct >= 60 ? "Good progress! Review the weaker sections." : "Keep studying — practice makes perfect!"}
        </div>
        <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 24 }}>
          <div style={{ width: `${pct}%`, height: "100%", background: c.accent, borderRadius: 4, transition: "width 1s ease" }} />
        </div>
        <button onClick={restart} style={{ background: c.accent, color: "#000", border: "none", borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <H2 accent={c.accent}>Knowledge Quiz</H2>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ color: "#cbd5e1", fontSize: 14 }}>Question {current + 1} of {QUIZ_QUESTIONS.length}</span>
        <Badge color={c.accent}>Score: {score}</Badge>
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${c.accent}44`, borderRadius: 14, padding: "24px 24px 20px" }}>
        <div style={{ color: "#cbd5e1", fontSize: 17, fontWeight: 600, marginBottom: 24, lineHeight: 1.5, textAlign: "left" }}>{q.q}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.opts.map((opt, i) => {
            let bg = "rgba(255,255,255,0.04)";
            let border = `1px solid rgba(255,255,255,0.1)`;
            let color = "#e2e8f0";
            if (answered) {
              if (i === q.answer) { bg = "rgba(74,222,128,0.15)"; border = "1px solid #4ade80"; color = "#4ade80"; }
              else if (i === selected && i !== q.answer) { bg = "rgba(248,113,113,0.15)"; border = "1px solid #f87171"; color = "#f87171"; }
            } else if (selected === i) {
              bg = `${c.accent}22`; border = `1px solid ${c.accent}`;
            }
            return (
              <button key={i} onClick={() => select(i)} style={{ background: bg, border, borderRadius: 9, padding: "12px 16px", color, textAlign: "left", cursor: answered ? "default" : "pointer", fontSize: 14.5, fontFamily: "monospace", transition: "all 0.15s" }}>
                <span style={{ color: c.accent, marginRight: 10, fontWeight: 700 }}>{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>
        {answered && (
          <button onClick={next} style={{ marginTop: 18, background: c.accent, color: "#000", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%" }}>
            {current + 1 >= QUIZ_QUESTIONS.length ? "See Results →" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function SchemeStudyGuide() {
  const [active, setActive] = useState("fp");
  const c = COLORS[active];

  const renderSection = () => {
    switch (active) {
      case "fp": return <FPConcepts c={c} />;
      case "basics": return <SchemeBasics c={c} />;
      case "lists": return <ListsAndPairs c={c} />;
      case "functions": return <FunctionsSection c={c} />;
      case "control": return <ControlFlow c={c} />;
      case "hof": return <HigherOrder c={c} />;
      case "recursion": return <Recursion c={c} />;
      case "quiz": return <Quiz c={c} />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: c.bg, transition: "background 0.4s ease", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "rgba(0,0,0,0.4)", borderBottom: `1px solid ${c.accent}33`, padding: "18px 24px 14px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
            <span style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 900, color: c.accent, letterSpacing: -1 }}>(scheme</span>
            <span style={{ color: "#94a3b8", fontSize: 15 }}>study-guide)</span>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "#64748b", background: "rgba(255,255,255,0.05)", padding: "3px 10px", borderRadius: 20 }}>SE2052 · SLIIT</span>
          </div>
          <nav style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
            {NAV.map(({ id, label, icon }) => (
              <button key={id} onClick={() => setActive(id)} style={{
                background: active === id ? `${COLORS[id].accent}22` : "transparent",
                border: active === id ? `1px solid ${COLORS[id].accent}88` : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8, padding: "6px 12px", color: active === id ? COLORS[id].accent : "#94a3b8",
                cursor: "pointer", fontSize: 13, fontWeight: active === id ? 700 : 400,
                whiteSpace: "nowrap", transition: "all 0.2s"
              }}>
                <span style={{ marginRight: 5 }}>{icon}</span>{label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 60px" }}>
        {renderSection()}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${c.accent}22`, padding: "14px 24px", textAlign: "center" }}>
        <span style={{ color: "#475569", fontSize: 12, fontFamily: "monospace" }}>
          Scheme Study Guide · Programming Paradigms SE2052 · Built with 💜 for SLIIT
        </span>
      </div>
    </div>
  );
}
