<script lang="ts">
  import type { PageData } from './$types';
  import { t } from '$lib/translations';

  let { data }: { data: PageData } = $props();
  let { issueTracking } = data;
</script>

<article>
  <header><h3><strong>{$t('msg.issueTracking')}</strong></h3></header>
  <table class="striped">
    <thead>
      <tr>
        <th></th>
        {#each issueTracking.issueStatuses as issueStatus}
          <th>{issueStatus.name}</th>
        {/each}
        <th>{$t('msg.total')}</th>
      </tr>
    </thead>
    <tbody>
      {#each issueTracking.trackers as tracker}
        <tr>
          <th class="row">{tracker.tracker.name}</th>
          {#each issueTracking.issueStatuses as issueStatus}
            <td>{tracker.issueStatusMap[issueStatus.id].count}</td>
          {/each}
          <td>{tracker.total}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <footer><a href="/issues">{$t('msg.viewAllIssues')}</a></footer>
</article>

<style>
  table th:not(.row),
  td {
    text-align: center;
  }
</style>
