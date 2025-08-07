import '../../public/styles/mylanding.css'

type BlogCardProps = {
  title: string;
  date: string;
  snippet: string;
  link: string;
};

const BlogCard = ({ title, date, snippet, link }: BlogCardProps) => {
  return (
    <div>
      <p className="bluecolor" >{date}</p>
      <h1 className="blog-title"><a href={link}>{title}</a></h1>
      <p className="para_space">{snippet}</p>
      <a className="bluecolor readmore" href={link}>Read more→</a>
    </div>
  );
};

export default BlogCard;
