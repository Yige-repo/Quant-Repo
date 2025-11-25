import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.hero}>
        <h1>Quant Notes</h1>
        <p>Personal quant knowledge base</p>
        <Link className={styles.button} to="/docs/intro">
          📘 Enter Knowledge Base
        </Link>
      </div>
    </Layout>
  );
}
