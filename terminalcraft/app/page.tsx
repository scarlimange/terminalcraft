"use client"
import { useState } from "react";
import Prompt from "@/components/Prompt";


type CommandEntry = {
  type: "input" | "output",
  content: string
}

export default function Home() {
  const [command, setCommand] = useState<string>('');
  const [history, setHistory] = useState<CommandEntry[]>([]);

  function handleCommand(command: string) {
    if (command == "clear") {
      setHistory([]);
      setCommand("");
      return
    }

    // push the command the user typed
    const newHistory = [ ...history, {
      type: "input" ,
      content: command
    }] as CommandEntry[];

    // add the output of running the command to the history
    setHistory([ ...newHistory, {
      type: "output",
      content: runCommand(command)
    }]);

    setCommand("");
  }

  function runCommand(fullCommand: string): string {
    const commandAndParams = fullCommand.split(" ");
    const command = commandAndParams.shift();
    switch (command) {
      case "ls": {
        return listFiles();
      }
      case "whoami": {
        return whoami();
      }
      case "cat": {
        return cat(commandAndParams[0]);
      }
      case "help": {
        return help();
      }
      case "hackclub": {
        return hackclubFlag();
      }
      case "clear":
        return ""
      default:
        return `terminalcraft: could not find command: ${command}`
    }
  }

  function listFiles() {
    return "about.md prizes.md faq.md";
  }

  function whoami() {
    return `
    Lo, there walks among us a Hack Clubber most peculiar, one who scorns the frilly gewgaws of modern UI and finds solace in the cold, unfeeling embrace of the terminal. Where others prattle of their "drag-and-drop" and their "material design," this steadfast soul wields naught but a blinking cursor and the righteous fury of a well-placed grep. They craft tools not for the faint of heart, but for those brave enough to dance with stdin and stdout, their fingers moving with eldritch speed across the keys, summoning forth mighty applications that demand respect—or at the very least, a well-formatted man page. Speak to them of "mouse support," and they shall laugh, a grim and knowing laugh, before returning to their endless battle with sed and awk. And lo, though their ways be arcane and their scripts indecipherable to lesser mortals, those who walk the path of the terminal know: theirs is the true and noble craft, unsullied by the bloat of the modern age.
    `
  }

  function cat(filename: string) {
    switch (filename) {
      case "about.md":
        return `# YSWS Hack Club: Browser Plugin: Terminal

Get ready to build and publish your own terminal program and earn a **Raspberry Pi 4**! 🎉 This is your chance to create something useful, learn new skills, and get a cool prize.

## What You Need to Do:
1. **Build a Terminal App** that solves a problem or improves your workflow.
2. **Get 10 Users** to use your program.
3. **Make It Open-Source** so others can learn from it.
4. **Support Both Unix (MacOS, Linux) and Windows** platforms.
5. **Provide Clear Instructions** on how to build and run your app.

### Tools You Can Use:
- **Textualize** (Recommended for web sharing)
- **Ncurses** (or any other framework)
  
## How to Get Involved:
1. Keep an eye on the **#announcement** channel on Slack for all the details.
2. Claim your **$5 grant** for a Chrome Web Store license (if applicable).
3. Submit your project via **Airtable** for review!

### Prize:
- **Raspberry Pi 4** 🖥️ (or $35 value)

Let's build some awesome terminal apps and hack the world together! 🌟`;
      case "prizes.md":
        return "Complete all challenges to win exclusive Hack Club stickers and bragging rights!";
      case "faq.md":
        return "Q: Why a terminal?\nA: Because terminals are cool!\nQ: How do I get started?\nA: Try using the 'ls' command!";
      default:
        return `cat: ${filename}: No such file or directory`;
    }
  }

  function help() {
    return `
Available commands:
  ls
    Lists all available files
    Example: ls

  cat <filename>
    Reads and displays the contents of a file
    Example: cat about.md

  whoami
    Displays information about the current user
    Example: whoami

  clear
    Clears the terminal screen
    Example: clear

  help
    Shows this help message with command descriptions and examples
    Example: help
    `.trim();
  }

  function hackclubFlag() {
    return `
<div class="flex flex-col items-start">
  <img src="/hackclub.svg" alt="Hack Club Flag" style="width: 300px; height: auto;" />

  <p class="mt-4">You found the secret Hack Club flag! 
Keep hacking and building awesome things! 🚀</p>
</div>
    `.trim();
  }

  return (
    <div 
      className="items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative bg-black"
      onClick={() => {
        const activePrompts = Array.from(document.getElementsByTagName('input'))
          .filter(input => !input.readOnly);
        if (activePrompts.length > 0) {
          activePrompts[activePrompts.length - 1].focus();
        }
      }}
    >
      {/* Terminal Content */}
      <div>
        {history.map((entry, idx) => (
          entry.type === "input" ?
          (<Prompt key={idx} command={entry.content} readonly={true}  />)
          : (
            !entry.content.includes("terminalcraft:") ? 
            <pre key={idx} className="whitespace-pre-wrap break-words max-w-full" 
                 dangerouslySetInnerHTML={{ __html: entry.content }}
                 style={{ lineHeight: '1.5' }}></pre>
            :
            <pre key={idx} className="whitespace-pre-wrap break-words max-w-full text-red-600">{entry.content}</pre>
          )
        ))}
      </div>

      <Prompt 
        command={command}
        setCommand={setCommand}
        handleCommand={handleCommand}
      />
    </div>
  );
}
