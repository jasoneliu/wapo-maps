import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import CardList from '../components/card-list';

const exampleArticle = {
  headline:
    'Len Oliver, soccer Hall of Famer and D.C. coaching mentor, dies at 88',
  subhead:
    'Len Oliver was a National Soccer Hall of Fame member who mentored thousands of aspiring coaches and was a fixture in the Washington, D.C.-area soccer scene for decades.',
  section: 'sports',
  byline: 'Steven Goff',
  date: 'July 25, 2022 at 12:06 PM EDT',
  imageUrl:
    'https://www.washingtonpost.com/resizer/45fz7BJDE5fJh2HkZXHSTyzRkzc=/300x0/arc-anglerfish-washpost-prod-washpost/public/G5R5TZOQX5EZTGFD4XFP56566Y.jpg?w=240&h=180',
  articleUrl:
    'https://www.washingtonpost.com/sports/2022/07/25/len-oliver-soccer-washington-dies/',
};

const articles = [
  exampleArticle,
  exampleArticle,
  exampleArticle,
  exampleArticle,
  exampleArticle,
];

const Dashboard = () => (
  <>
    <Head>
      <title>WaPo Maps</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}></Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
