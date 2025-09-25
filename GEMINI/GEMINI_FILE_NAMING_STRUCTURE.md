# File Naming Structure for Crossword Project

All files related to the crossword puzzle functionality must be prefixed with "crossword_", with the exception of `index_crossword.html`.

This modular structure separates the puzzle generators from their word sources and the final puzzle instances.

### Main Entry Point

The main entry point for the crossword section is:
- `index_crossword.html`

### Puzzle Generators

These files dynamically create crossword puzzles.
- `crossword_generator3x3.html`
- `crossword_generator4x4.html`
- `crossword_layout_generator.html`

### Word Banks

These JavaScript files contain the word lists used by the generators.
- `crossword_words_letters3.js`
- `crossword_words_letters4.js`
- `crossword_words_tereo.js`

### Static Crossword Puzzles

These are the specific, playable crossword puzzle files.
- `crossword_21sep2025.html`
- `crossword_22sep2025.html`
- `crossword_23sep2025_tereo.html`
- `crossword3x3.html`
- `crossword4x4.html`
