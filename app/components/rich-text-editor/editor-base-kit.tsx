import { BaseAlignKit } from "../plugin/align-base-kit";
import { BaseBasicBlocksKit } from "../plugin/basic-blocks-base-kit";
import { BaseBasicMarksKit } from "../plugin/basic-marks-base-kit";
import { BaseCalloutKit } from "../plugin/callout-base-kit";
import { BaseCodeBlockKit } from "../plugin/code-block-base-kit";
import { BaseColumnKit } from "../plugin/column-base-kit";
import { BaseCommentKit } from "../plugin/comment-base-kit";
import { BaseDateKit } from "../plugin/date-base-kit";
import { BaseFontKit } from "../plugin/font-base-kit";
import { BaseLineHeightKit } from "../plugin/line-height-base-kit";
import { BaseLinkKit } from "../plugin/link-base-kit";
import { BaseListKit } from "../plugin/list-base-kit";
import { MarkdownKit } from "../plugin/markdown-kit";
// import { BaseMathKit } from './plugin/math-base-kit';
import { BaseMediaKit } from "../plugin/media-base-kit";
import { BaseMentionKit } from "../plugin/mention-base-kit";
import { BaseSuggestionKit } from "../plugin/suggestion-base-kit";
import { BaseTableKit } from "../plugin/table-base-kit";
import { BaseTocKit } from "../plugin/toc-base-kit";
import { BaseToggleKit } from "../plugin/toggle-base-kit";

export const BaseEditorKit = [
  ...BaseBasicBlocksKit,
  ...BaseCodeBlockKit,
  ...BaseTableKit,
  ...BaseToggleKit,
  ...BaseTocKit,
  ...BaseMediaKit,
  ...BaseCalloutKit,
  ...BaseColumnKit,
  // ...BaseMathKit,
  ...BaseDateKit,
  ...BaseLinkKit,
  ...BaseMentionKit,
  ...BaseBasicMarksKit,
  ...BaseFontKit,
  ...BaseListKit,
  ...BaseAlignKit,
  ...BaseLineHeightKit,
  ...BaseCommentKit,
  ...BaseSuggestionKit,
  ...MarkdownKit,
];
