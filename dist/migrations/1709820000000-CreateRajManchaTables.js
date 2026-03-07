"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRajManchaTables1709820000000 = void 0;
class CreateRajManchaTables1709820000000 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS raj_mancha`);
        await queryRunner.query(`
      CREATE TABLE raj_mancha.vimarsh_threads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(500) NOT NULL,
        samiti_id UUID NOT NULL,
        current_samiti_id UUID NOT NULL,
        is_native BOOLEAN DEFAULT true,
        author_username VARCHAR(50) NOT NULL,
        assigned_by_username VARCHAR(50),
        status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
        vimarsh_type VARCHAR(20) NOT NULL DEFAULT 'PROPOSAL',
        current_draft_number INT DEFAULT 1,
        post_count INT DEFAULT 0,
        is_locked BOOLEAN DEFAULT false,
        gazette_id UUID,
        vote_for_count INT DEFAULT 0,
        vote_against_count INT DEFAULT 0,
        vote_abstain_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        voting_started_at TIMESTAMP,
        voting_ended_at TIMESTAMP
      )
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_threads_samiti ON raj_mancha.vimarsh_threads(samiti_id)
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_threads_current_samiti ON raj_mancha.vimarsh_threads(current_samiti_id)
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_threads_status ON raj_mancha.vimarsh_threads(status)
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_threads_author ON raj_mancha.vimarsh_threads(author_username)
    `);
        await queryRunner.query(`
      CREATE TABLE raj_mancha.vimarsh_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        thread_id UUID NOT NULL REFERENCES raj_mancha.vimarsh_threads(id) ON DELETE CASCADE,
        author_username VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        post_type VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
        draft_number INT,
        content_hash VARCHAR(64) NOT NULL,
        previous_hash VARCHAR(64),
        post_number INT NOT NULL,
        reply_to_id UUID REFERENCES raj_mancha.vimarsh_posts(id),
        like_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_posts_thread ON raj_mancha.vimarsh_posts(thread_id)
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_posts_author ON raj_mancha.vimarsh_posts(author_username)
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_posts_draft ON raj_mancha.vimarsh_posts(thread_id, draft_number)
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_posts_post_number ON raj_mancha.vimarsh_posts(thread_id, post_number)
    `);
        await queryRunner.query(`
      CREATE TABLE raj_mancha.vimarsh_votes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        thread_id UUID NOT NULL REFERENCES raj_mancha.vimarsh_threads(id) ON DELETE CASCADE,
        username VARCHAR(50) NOT NULL,
        vote_type VARCHAR(20) NOT NULL,
        voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(thread_id, username)
      )
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_votes_thread ON raj_mancha.vimarsh_votes(thread_id)
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_votes_username ON raj_mancha.vimarsh_votes(username)
    `);
        await queryRunner.query(`
      CREATE TABLE raj_mancha.vimarsh_likes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        post_id UUID NOT NULL REFERENCES raj_mancha.vimarsh_posts(id) ON DELETE CASCADE,
        username VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(post_id, username)
      )
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_likes_post ON raj_mancha.vimarsh_likes(post_id)
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_likes_username ON raj_mancha.vimarsh_likes(username)
    `);
        await queryRunner.query(`
      CREATE TABLE raj_mancha.vimarsh_polls (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        thread_id UUID NOT NULL REFERENCES raj_mancha.vimarsh_threads(id) ON DELETE CASCADE,
        question VARCHAR(500) NOT NULL,
        poll_type VARCHAR(20) NOT NULL DEFAULT 'SINGLE_CHOICE',
        options JSONB NOT NULL,
        results JSONB DEFAULT '{}',
        is_closed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        closed_at TIMESTAMP
      )
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_polls_thread ON raj_mancha.vimarsh_polls(thread_id)
    `);
        await queryRunner.query(`
      CREATE TABLE raj_mancha.vimarsh_poll_votes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        poll_id UUID NOT NULL REFERENCES raj_mancha.vimarsh_polls(id) ON DELETE CASCADE,
        username VARCHAR(50) NOT NULL,
        selected_options JSONB NOT NULL,
        voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(poll_id, username)
      )
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_poll_votes_poll ON raj_mancha.vimarsh_poll_votes(poll_id)
    `);
        await queryRunner.query(`
      CREATE INDEX idx_vimarsh_poll_votes_username ON raj_mancha.vimarsh_poll_votes(username)
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS raj_mancha.vimarsh_poll_votes CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS raj_mancha.vimarsh_polls CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS raj_mancha.vimarsh_likes CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS raj_mancha.vimarsh_votes CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS raj_mancha.vimarsh_posts CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS raj_mancha.vimarsh_threads CASCADE`);
        await queryRunner.query(`DROP SCHEMA IF EXISTS raj_mancha CASCADE`);
    }
}
exports.CreateRajManchaTables1709820000000 = CreateRajManchaTables1709820000000;
//# sourceMappingURL=1709820000000-CreateRajManchaTables.js.map