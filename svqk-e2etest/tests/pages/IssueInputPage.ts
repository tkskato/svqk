import BasePage from '../arch/BasePage';
import { t } from '../arch/MultiLng';

export default class IssueInputPage extends BasePage {
  get pageNameKey() {
    return 'newIssue';
  }

  async inputSubject(subject: string) {
    await this.inputText('#subject', subject);
  }

  async inputDescription(description: string) {
    await this.inputText('#description', description);
  }

  async clickSaveBtn() {
    await this.click('#save');
    await this.expectGlobalMessage(t('saved'));
  }

  async expectSubject(subject: string) {
    await this.expectText('#subject', subject);
  }

  async expectDescription(description?: string) {
    await this.expectText('#description', description ?? '');
  }
}
