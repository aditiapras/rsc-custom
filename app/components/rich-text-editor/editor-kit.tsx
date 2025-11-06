"use client";

import { TrailingBlockPlugin, type Value } from "platejs";
import { type TPlateEditor, useEditorRef } from "platejs/react";
import { MarkdownKit } from "~/components/plugin/markdown-kit";
import { AlignKit } from "~/components/rich-text-editor/align-kit";
import { AutoformatKit } from "~/components/rich-text-editor/autoformat-kit";
import { BasicBlocksKit } from "~/components/rich-text-editor/basic-blocks-kit";
import { BasicMarksKit } from "~/components/rich-text-editor/basic-marks-kit";
import { BlockMenuKit } from "~/components/rich-text-editor/block-menu-kit";
import { BlockPlaceholderKit } from "~/components/rich-text-editor/block-placeholder-kit";
import { CalloutKit } from "~/components/rich-text-editor/callout-kit";
import { CodeBlockKit } from "~/components/rich-text-editor/code-block-kit";
import { ColumnKit } from "~/components/rich-text-editor/column-kit";
import { CommentKit } from "~/components/rich-text-editor/comment-kit";
import { CursorOverlayKit } from "~/components/rich-text-editor/cursor-overlay-kit";
import { DateKit } from "~/components/rich-text-editor/date-kit";
import { DiscussionKit } from "~/components/rich-text-editor/discussion-kit";
import { DndKit } from "~/components/rich-text-editor/dnd-kit";
import { DocxKit } from "~/components/rich-text-editor/docx-kit";
import { EmojiKit } from "~/components/rich-text-editor/emoji-kit";
import { ExitBreakKit } from "~/components/rich-text-editor/exit-break-kit";
import { FixedToolbarKit } from "~/components/rich-text-editor/fixed-toolbar-kit";
import { FloatingToolbarKit } from "~/components/rich-text-editor/floating-toolbar-kit";
import { FontKit } from "~/components/rich-text-editor/font-kit";
import { LineHeightKit } from "~/components/rich-text-editor/line-height-kit";
import { LinkKit } from "~/components/rich-text-editor/link-kit";
import { ListKit } from "~/components/rich-text-editor/list-kit";
import { MediaKit } from "~/components/rich-text-editor/media-kit";
import { MentionKit } from "~/components/rich-text-editor/mention-kit";
import { SlashKit } from "~/components/rich-text-editor/slash-kit";
import { SuggestionKit } from "~/components/rich-text-editor/suggestion-kit";
import { TableKit } from "~/components/rich-text-editor/table-kit";
import { TocKit } from "~/components/rich-text-editor/toc-kit";
import { ToggleKit } from "~/components/rich-text-editor/toggle-kit";

export const EditorKit = [
  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...TocKit,
  ...MediaKit,
  ...CalloutKit,
  ...ColumnKit,
  ...DateKit,
  ...LinkKit,
  ...MentionKit,

  // Marks
  ...BasicMarksKit,
  ...FontKit,

  // Block Style
  ...ListKit,
  ...AlignKit,
  ...LineHeightKit,

  // Collaboration
  ...DiscussionKit,
  ...CommentKit,
  ...SuggestionKit,

  // Editing
  ...SlashKit,
  ...AutoformatKit,
  ...CursorOverlayKit,
  ...BlockMenuKit,
  ...DndKit,
  ...EmojiKit,
  ...ExitBreakKit,
  TrailingBlockPlugin,

  // Parsers
  ...DocxKit,
  ...MarkdownKit,

  // UI
  ...BlockPlaceholderKit,
  ...FixedToolbarKit,
  ...FloatingToolbarKit,
];

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>;

export const useEditor = () => useEditorRef<MyEditor>();
