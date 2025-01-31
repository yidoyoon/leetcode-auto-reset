# Leetcode Auto Reset

If you're studying through LeetCode, there's one feature you might need: 'Auto Code Reset'. When revisiting problems for review, your previous answers always remain. Manually resetting them each time is a hassle! This Chrome extension automates this tedious repetitive task for you.

**📌 Currently, this extension performs resets only on data stored locally.**

## Prerequisite

- pnpm

## Installation

1. Clone the repository using the following command:

```
git clone https://github.com/yidoyoon/leetcode-auto-reset.git
```

2. Install the required modules using the following command:

```
cd leetcode-auto-reset
pnpm install
```

3. Build the project using the following command:

```
pnpm build
```

4. Enable Developer Mode in Chrome:
- Open Chrome and navigate to chrome://extensions/.
- Toggle the 'Developer mode' switch to ON.

5. Load the unpacked extension:
- Click the 'Load unpacked' button.
- Select the `dist` directory from the cloned repository.

6. Activate the auto-reset feature:
- With the extension loaded, click the extension button to set the icon to display 'ON'.

From then on, the code submission records for the LeetCode problems you've already solved will be automatically erased.
