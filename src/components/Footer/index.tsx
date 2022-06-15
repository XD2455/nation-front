import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-layout';
import {PLANET_LINK} from "@/constants";

const Footer: React.FC = () => {
  const defaultMessage = 'yang出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'planet',
          title: '啊',
          href: PLANET_LINK,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined/>GitHub</>,
          href: 'https://github.com',
          blankTarget: true,
        },
        {
          key: 'codeNav',
          title: '对对对',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
