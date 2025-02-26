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
    Lo, there walks among us a Hack Clubber most peculiar, one who scorns the frilly gewgaws of modern UI and finds solace in the cold, unfeeling embrace of the terminal. Where others prattle of their "drag-and-drop" and their "material design," this steadfast soul wields naught but a blinking cursor and the righteous fury of a well-placed grep.

They craft tools not for the faint of heart, but for those brave enough to dance with stdin and stdout, their fingers moving with eldritch speed across the keys, summoning forth mighty applications that demand respect—or at the very least, a well-formatted man page. Speak to them of "mouse support," and they shall laugh, a grim and knowing laugh, before returning to their endless battle with sed and awk.

And lo, though their ways be arcane and their scripts indecipherable to lesser mortals, those who walk the path of the terminal know: theirs is the true and noble craft, unsullied by the bloat of the modern age.
    `
  }

  function cat(filename: string) {
    switch (filename) {
      case "about.md":
        return "Welcome to the Hack Club Terminal Challenge!\nThis is a fun way to explore and learn about terminal commands.";
      case "prizes.md":
        return "Complete all challenges to win exclusive Hack Club stickers and bragging rights!";
      case "faq.md":
        return "Q: Why a terminal?\nA: Because terminals are cool!\nQ: How do I get started?\nA: Try using the 'ls' command!";
      default:
        return `cat: ${filename}: No such file or directory`;
    }
  }

  return (
    <div className="items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {history.map((entry, idx) => (
        entry.type === "input" ?
        (<Prompt key={idx} command={entry.content} readonly={true}  />)
        : (
          <p key={idx}>{entry.content}</p>
        )
      ))}

      <Prompt 
        command={command}
        setCommand={setCommand}
        handleCommand={handleCommand}
      />
    </div>
  );
}
