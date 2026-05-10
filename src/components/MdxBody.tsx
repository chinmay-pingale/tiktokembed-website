import { MDXRemote } from "next-mdx-remote-client/rsc";
import "./blog-prose.css";

type Props = {
  source: string;
};

export default function MdxBody({ source }: Props) {
  return (
    <div className="prose-blog">
      <MDXRemote source={source} />
    </div>
  );
}
